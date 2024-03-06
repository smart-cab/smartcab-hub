import json
import logging

from smartcab.dev import devmap
import paho.mqtt.client as mqtt
from paho.mqtt import MQTTException

MQTTC = mqtt.Client()

BROKER_URL = "mosquitto"
BROKER_PORT = 1883


class MQTTConnectionError(MQTTException):
    pass


def on_connect(client, userdata, flags, rc):
    logging.info(f"MQTT Connected With Result Code {rc}")
    if rc == 0:
        logging.info("MQTT Connection successful!")
    elif rc == 1:
        logging.error("MQTT Connection error – incorrect protocol version")
    elif rc == 2:
        logging.error("MQTT Connection error – invalid client identifier")
    elif rc == 3:
        logging.error("MQTT Connection error – server unavailable")
    elif rc == 4:
        logging.error("MQTT Connection error – bad username or password")
    elif rc == 5:
        logging.error("MQTT Connection error – not authorised")
    else:
        logging.error("MQTT Unknown result code recieved")


def on_disconnect(client, userdata, rc):
    logging.info("Client disconnected successfully")


def on_message(client, userdata, message):
    data = json.loads(message.payload.decode())

    for mqtti in devmap.interfaces("mqtt"):
        if mqtti is None or mqtti.addr != message.topic:
            continue

    logging.debug("MQTT Message Recieved: " + message.payload.decode())


def setup_client_hooks():
    MQTTC.on_connect = on_connect
    MQTTC.on_message = on_message


def apply_subscriptions():
    for mqtti in devmap.interfaces("mqtt"):
        if mqtti is None or not mqtti.subscribe:
            continue
        MQTTC.subscribe(mqtti.addr)


def connect_client():
    try:
        MQTTC.connect(BROKER_URL, BROKER_PORT)
    except OSError as e:
        raise MQTTConnectionError(e)


def init():
    setup_client_hooks()
    connect_client()
    apply_subscriptions()
