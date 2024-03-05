import os
import logging
from flask import Flask
from pathlib import Path
from flask_cors import CORS
from smartcab.data.db import get_db_url
from smartcab.api import statistic, devices

PROD = os.getenv("PROD", "false") == "true"

BLUEPRINT_MODULES = {statistic, devices}


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


def apply_blueprints(app: Flask):
    for module in BLUEPRINT_MODULES:
        app.register_blueprint(module.blueprint)


def make_app():
    app = Flask(__name__)
    app.logger.setLevel(logging.INFO)
    app.config.update(
        dict(
            DEBUG=not PROD,
            DATABASE=get_db_url(),
            SECRET_KEY=get_secret_key(),
            ERROR_404_HELP=False,
        )
    )

    CORS(app)
    apply_blueprints(app)

    logging.info("Application was created successfully")

    return app
