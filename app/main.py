from threading import Thread
from flask import Flask, render_template, jsonify
from zigbee.sub import SENSOR, client


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get_temp")
def get_temp():
    data = {
        "temperature": SENSOR.temperature,
        "humidity": SENSOR.humidity
    }
    return jsonify(data)


if __name__ == "__main__":
    t2 = Thread(target=client.loop_forever, 
                name="Zigbee")
    t2.start()
    app.run()
