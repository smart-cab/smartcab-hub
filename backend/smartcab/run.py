import os
import smartcab

from flask_cors import CORS
from threading import Thread
from smartcab import interface
from smartcab.data.db import global_init
from smartcab.dev import DEVICES
from smartcab.interface import mqtt
from smartcab.interface.mqtt import MQTTC
from flask import Flask, jsonify, request
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

app = smartcab.make_app()


@app.route("/<device>", methods=["GET"])
def mqtt_get(device):
    return {"status": "ok"} | DEVICES[device].get_interface(interface.MQTT).get_data()


@app.route("/<device>", methods=["POST"])
def mqtt_publish(device):
    field = request.args.get("field", None)
    value = request.args.get("value")
    DEVICES[device].get_interface(interface.MQTT).set(value, field)
    return {"status": "ok"}


@app.route("/new_voice/<", methods=["GET"])
def new_voice(device):
    return {"status": "ok"} | DEVICES[device].get_interface(interface.MQTT).get_data()


if __name__ == "__main__":
    global_init()
    # mqtt.init()
    # subscriber_client_thread = Thread(target=MQTTC.loop_forever)
    # subscriber_client_thread.start()
    app.run(host="0.0.0.0", port=5000)
    # subscriber_client_thread.join()
