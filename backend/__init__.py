import os
import config
from data.db import get_db_url
from flask import Flask
from flask_cors import CORS


# Load .env file
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())


def get_secret_key():
    if not os.getenv("SECRET_KEY_FILE"):
        config.print_worning("In .env file don't set SECRET_KEY_FILE")

    with open(os.getenv("SECRET_KEY_FILE", "/run/secrets/secret_key")) as file:
        return file.read().rstrip()


def make_app():
    # Create app
    app = Flask(__name__)

    # Set headings for API handels
    CORS(app)

    # Definition app mode
    match os.getenv("FLAK_MODE"):
        case "development":
            debug = False
        case "production":
            debug = True
        case _:
            config.print_worning("In .env file don't set FLASK_MODE")
            debug = False

    # set app config
    app.config.update(dict(
        DEBUG=debug,
        DATABASE=get_db_url(),
        SECRET_KEY=get_secret_key(),
        ERROR_404_HELP=False,
    ))

    config.print_succes("✔ Application was created successfully")
    return app

