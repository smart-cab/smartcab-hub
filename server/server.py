from flask import Flask, jsonify, request
from zigbee.sub import SENSOR, client
from flask_cors import CORS
from threading import Thread 


app = Flask(__name__)
CORS(app)


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
     

@app.route('/get_pressure', methods=["GET"])
def get_pressure():
    data = {
        "status": "OK",
        "pressure": SENSOR.pressure
        }

    response = jsonify(data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route("/dev_control", methods=["POST", "OPTIONS"])
def device_control():
    device_id = request.args.get("dev_id")
    option = request.args.get("option")
    client.publish(f"zigbee2mqtt/{device_id}/set", option)
    data = {
            "status": "OK"
        }
    response = jsonify(data)
    return response


if __name__ == '__main__':
    subscriber_client_thread = Thread(target=client.loop_forever)
    subscriber_client_thread.start()
    app.run()
    subscriber_client_thread.join()
