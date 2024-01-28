from threading import Thread

from dotenv import find_dotenv, load_dotenv
from flask import request

import smartcab
from smartcab import interface
from smartcab.data import db
from smartcab.data.eval_types import EvalType
from smartcab.data.lessons import Lesson
from smartcab.dev import DEVICES
from smartcab.interface import mqtt
from smartcab.interface.mqtt import MQTTC


load_dotenv(find_dotenv())

app = smartcab.make_app()


@app.route("/new_vote", methods=["GET",  "POST"])
def new_voice():
    vote = request.args.get("vote")
    with db.session() as db_sess:
        type_id = db_sess.query(EvalType).filter(EvalType.eval_type == vote).first().id
        db_sess.add(Lesson(eval_id=type_id))
        db_sess.commit()
    return {'status': 'ok'}


@app.route("/device/<device_id>", methods=["GET"])
def mqtt_get(device_id):
    return {"status": "ok"} | DEVICES[device_id].get_interface(interface.MQTT).get_data()


@app.route("/device/<device_id>", methods=["POST"])
def mqtt_publish(device_id):
    field = request.args.get("field", None)
    value = request.args.get("value")
    DEVICES[device_id].get_interface(interface.MQTT).set(value, field)
    return {"status": "ok"}


if __name__ == "__main__":
    db.global_init()
    # mqtt.init()
    # subscriber_client_thread = Thread(target=MQTTC.loop_forever)
    # subscriber_client_thread.start()
    app.run(host="0.0.0.0", port=5000)
    # subscriber_client_thread.join()
