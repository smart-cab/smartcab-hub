import logging
from threading import Thread

from dotenv import find_dotenv, load_dotenv
import smartcab
from smartcab.data import db
from smartcab.interface import mqtt
from smartcab.interface.mqtt import MQTTC, MQTTConnectionError


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

    smartcab.registr_blueprints(app)

    subscriber_client_thread = Thread(target=MQTTC.loop_forever)
    subscriber_client_thread.start()

    app.run(host="0.0.0.0", port=5000)


if __name__ == "__main__":
    main()
