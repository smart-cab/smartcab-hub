from flask import Flask, render_template, jsonify
from flask_login import (
    LoginManager,
    login_url,
    login_required,
    logout_user,
    current_user
)
from zigbee.sub import SENSOR


app = Flask(__name__)
login_manager = LoginManager()
# login_manager.init_app(app)


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


def main():
    app.run()


if __name__ == "__main__":
    main()