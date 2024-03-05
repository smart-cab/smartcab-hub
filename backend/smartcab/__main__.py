import logging
import smartcab
import multiprocessing

import gunicorn.app.base
from smartcab.data import db
from threading import Thread
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

    def load(self):
        return self.application


def main() -> None:
    load_dotenv(find_dotenv())

    app = smartcab.make_app()

    db.global_init()

    try:
        mqtt.init()
    except MQTTConnectionError as e:
        logging.error(
            f"Failed to connect to MQTT-broker: {e}. MQTT related queries won't be processed"
        )

    smartcab.register_blueprints(app)

    mqttct = Thread(target=MQTTC.loop_forever)
    mqttct.daemon = True
    mqttct.start()

    WORKERS = (multiprocessing.cpu_count() * 2) + 1

    WSGIApplication(
        smartcab.make_app(),
        {"bind": f"0.0.0.0:5000", "workers": WORKERS},
    ).run()


if __name__ == "__main__":
    main()
