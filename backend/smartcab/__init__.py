import os
import logging
from flask import Flask
from flask_cors import CORS
from smartcab.data.db import get_db_url


def get_secret_key():
    if not os.getenv("SECRET_KEY_FILE"):
        logging.warning("In .env file don't set SECRET_KEY_FILE")

    with open(os.getenv("SECRET_KEY_FILE", "/run/secrets/secret_key")) as file:
        return file.read().rstrip()


import logging


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
