import os
import logging
from flask import Flask
from pathlib import Path
from flask_cors import CORS
from smartcab.data.db import get_db_url
from smartcab.api import statistic, devices


blueprints_modules = [
    statistic,
    devices,
]


def running_within_docker() -> bool:
    cgroup = Path("/proc/self/cgroup")
    return (
        Path("/.dockerenv").is_file()
        or cgroup.is_file()
        and "docker" in cgroup.read_text()
    )


def get_secret_key():
    if running_within_docker():
        with open("/run/secrets/secret_key") as file:
            return file.read().rstrip()

    DEFAULT_PATH = ".secrets/secret_key"

    with open(os.getenv("SECRET_KEY_FILE", DEFAULT_PATH)) as file:
        return file.read().rstrip()


def registr_blueprints(app: Flask):
    for module in blueprints_modules:
        app.register_blueprint(module.blueprint)


def make_app():
    # Create app
    app = Flask(__name__)

    # Set headings for API handels
    CORS(app)

    # Definition app mode
    match os.getenv("FLASK_MODE"):
        case "development":
            debug = False
        case "production":
            debug = True
        case _:
            logging.warning("In .env file don't set FLASK_MODE")
            debug = False

    # set app config
    app.config.update(
        dict(
            DEBUG=debug,
            DATABASE=get_db_url(),
            SECRET_KEY=get_secret_key(),
            ERROR_404_HELP=False,
        )
    )
    app.logger.setLevel(logging.INFO)
    logging.getLogger().setLevel(logging.DEBUG)

    logging.info("Application was created successfully")
    return app
