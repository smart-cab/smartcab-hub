import logging
from threading import Thread

from dotenv import find_dotenv, load_dotenv
from flask import abort, request
from paramiko import SSHException

import smartcab
import firewall
from smartcab import use_db
from smartcab import interface
from smartcab.data import db
from smartcab.dev import DEVICES
from smartcab.interface import mqtt
from smartcab.interface.mqtt import MQTTC, MQTTConnectionError

load_dotenv(find_dotenv())

app = smartcab.make_app()


@app.route("/status", methods=["GET"])
def status():
    return {"status": "ok"}


@app.route("/new_vote", methods=["GET", "POST"])
def new_vote():
    vote = str(request.args.get("vote"))
    use_db.write_new_vote_to_db(vote)
    return {"status": "ok"}


@app.route("/mqtt/<device_id>", methods=["GET"])
def mqtt_get(device_id):
    device = DEVICES.get(device_id, None)
    if device is None:
        abort(404)

    mqtti = device.get_interface(interface.MQTT)
    if mqtti is None:
        abort(404)

    return {"status": "ok"} | mqtti.get_data()


@app.route("/mqtt/<device_id>", methods=["POST"])
def mqtt_publish(device_id):
    device = DEVICES.get(device_id, None)
    if device is None:
        abort(404)

    mqtti = device.get_interface(interface.MQTT)
    if mqtti is None:
        abort(404)

    field = request.args.get("field", None)
    value = request.args.get("value")

    mqtti.set(value, field)
    return {"status": "ok"}


@app.route("/ssh/<device_id>", methods=["GET"])
# @firewall.apply
async def ssh_execute(device_id):
    device = DEVICES.get(device_id, None)
    if device is None:
        abort(404)

    sshi = device.get_interface(interface.SSH)
    command = request.args.get("command", None)

    if sshi is None or command is None:
        abort(404)

    try:
        await sshi.execute(command)
    except SSHException:
        return {"status": "error", "error": "failed to execute ssh command"}

    return {
        "status": "ok",
    }


if __name__ == "__main__":
    db.global_init()
    # use_db.get_grade_statistics()
    try:
        mqtt.init()
    except MQTTConnectionError as e:
        logging.error(
            f"Failed to connect to MQTT-broker: {e}. MQTT related queries won't be processed"
        )
    subscriber_client_thread = Thread(target=MQTTC.loop_forever)
    subscriber_client_thread.start()
    app.run(host="0.0.0.0", port=5000)
