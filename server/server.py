from flask import Flask, jsonify, Response
from zigbee.sub import SENSOR, client
from threading import Thread
 

app = Flask(__name__)


@app.route('/get_temp', methods=["GET"])
def get_temp():
    data = {
        "status": "OK",
        "temp": SENSOR.temperature
        }

    response = jsonify(data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route('/get_humidity', methods=["GET"])
def get_humidity():
    data = {
        "status": "OK",
        "humidity": SENSOR.humidity
        }

    response = jsonify(data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route('/get_co2', methods=["GET"])
def get_co2():
    data = {
        "status": "OK",
        # "co2": SENSOR.co2
        "co2": 0
        }

    response = jsonify(data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response
     

if __name__ == '__main__':
    subscriber_client_thread = Thread(target=client.loop_forever)
    subscriber_client_thread.start()
    app.run()
    subscriber_client_thread.join()