import json

from pprint import pprint
import paho.mqtt.client as mqtt
from smartcab import interface
from smartcab.dev import DEVICES

MQTTC = mqtt.Client()

BROKER_URL = "192.168.0.104"
BROKER_PORT = 1883


def on_connect(client, userdata, flags, rc):
    print(f"Connected With Result Code {rc}")
    if rc == 0:
        print("Connection successful!")
    elif rc == 1:
        print("Connection error – incorrect protocol version")
    elif rc == 2:
        print("Connection error – invalid client identifier")
    elif rc == 3:
        print("Connection error – server unavailable")
    elif rc == 4:
        print("Connection error – bad username or password")
    elif rc == 5:
        print("Connection error – not authorised")
    else:
        print("I don't know what happening...")


def on_disconnect(client, userdata, rc):
    print("Client successful disconnected")


def on_message(client, userdata, message):
    print(message.topic.decode())
    data = json.loads(message.payload.decode())

    for device in DEVICES.values():
        mqtti = device.get_interface(interface.MQTT)
        if mqtti is None:
            continue
        mqtti.unpack_data(data)

    pprint("Message Recieved: " + message.payload.decode())


def setup_client_hooks():
    MQTTC.on_connect = on_connect
    MQTTC.on_message = on_message


def apply_subscriptions():
    for device in DEVICES.values():
        mqtti = device.get_interface(interface.MQTT)
        if mqtti is None or not mqtti.subscribe:
            continue


def connect_client():
    MQTTC.connect(BROKER_URL, BROKER_PORT)


def init():
    setup_client_hooks()
    connect_client()
    apply_subscriptions()
