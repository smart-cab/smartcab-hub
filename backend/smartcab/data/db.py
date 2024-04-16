from contextlib import AbstractContextManager, contextmanager
from os.path import isfile
import sqlalchemy as sa
import os
import platform
import logging

import sqlalchemy.ext.declarative as dec
import sqlalchemy.orm as orm
from sqlalchemy.orm import Session

from smartcab.utils import get_default_eval_types


SqlAlchemyBase = dec.declarative_base()


factory = None
engine = None


def get_db_url():
    db_folder = os.getenv("DB_FOLDER")
    db_name = os.getenv("DB_NAME")

    return f"sqlite:///{db_folder}/{db_name}"


def global_init():
    global factory
    global engine

    if factory:
        return

    init_filling = not os.path.isfile(
        f"{os.getenv('DB_FOLDER')}/{os.getenv('DB_NAME')}"
    )

    logging.info(f"sqlite3_db_url: {get_db_url()}")
    engine = sa.create_engine(get_db_url(), echo=False)
    engine.update_execution_options(connect_args={"connect_timeout": 5})
    factory = orm.sessionmaker(bind=engine)

    from . import __all_models

    SqlAlchemyBase.metadata.create_all(engine)

    if init_filling:
        from smartcab.data.eval_types import init_base_types
        from smartcab.data.hub_password import init_base_password

        init_base_types()
        if (base_type := get_default_eval_types()):
            logging.info(f"Base eval types were created: {', '.join(base_type)[:-2]}")

        init_base_password()
        logging.info(f"Base was set: {os.getenv("INIT_PASSWORD")}")

    logging.info("SqLite3 database connection was initialized successfully")


def remove():
    global factory
    if factory:
        factory.close_all()


def make_thread_safe():
    if engine:
        engine.dispose()
    remove()


class session(AbstractContextManager):
    def __init__(self):
        global factory
        self.session = factory()

    def __enter__(self):
        return self.session

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type:
            self.session.rollback()
        self.session.close()
