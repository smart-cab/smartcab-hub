import os
import ssl
import logging

import smartcab
import multiprocessing

import gunicorn.app.base
from smartcab import PROD
from smartcab.data import db
from threading import Thread
from smartcab.dev import devmap
from smartcab.interface import mqtt
from dotenv import find_dotenv, load_dotenv
from smartcab.interface.mqtt import MQTTC, MQTTConnectionError


class WSGIApplication(gunicorn.app.base.BaseApplication):
    def __init__(self, app, options=None):
        self.options = options or {}
        self.application = app
        super().__init__()

    def load_config(self):
        config = {
            key: value
            for key, value in self.options.items()
            if key in self.cfg.settings and value is not None
        }
        for key, value in config.items():
            self.cfg.set(key.lower(), value)
        self.cfg.set("cert_reqs", 0)

    def load(self):
        ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        # Подключение SSL контекста к серверу
        self.options['ssl_context'] = ssl_context
        return self.application


DEVMAP_FILE_PATH = os.path.join(os.getcwd(), "devmap.yaml")


def main() -> None:
    load_dotenv(find_dotenv())

    logging.getLogger().setLevel(logging.DEBUG)

    devmap.append_from_file(DEVMAP_FILE_PATH)

    db.global_init()

    try:
        mqtt.init()
    except MQTTConnectionError as e:
        logging.error(
            f"Failed to connect to MQTT-broker: {e}. MQTT related queries won't be processed"
        )

    mqttct = Thread(target=MQTTC.loop_forever, daemon=True)
    mqttct.start()

    WORKERS = (multiprocessing.cpu_count() * 2) + 1

    app = smartcab.make_app()

    if PROD:
        logging.info("Running in production-mode - gunicorn server will be used")
        WSGIApplication(
            app,
            {
                "bind": f"0.0.0.0:5000",
                "workers": WORKERS,
                "certfile": "./certs/sch1357.ru.crt",
                "keyfile": "./certs/sch1357.ru.key",
            },
        ).run()
    else:
        logging.info("Running in development-mode - flask standard server will be used")
        app.run(host="0.0.0.0", port=5000, debug=True )


if __name__ == "__main__":
    main()
