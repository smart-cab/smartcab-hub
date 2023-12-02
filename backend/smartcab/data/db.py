from contextlib import AbstractContextManager, contextmanager
import sqlalchemy as sa
import os

import sqlalchemy.ext.declarative as dec
import sqlalchemy.orm as orm
from sqlalchemy.orm import Session

SqlAlchemyBase = dec.declarative_base()

factory = None
engine = None


def get_db_url():
    db_folder = os.getenv("DB_FOLDER")
    db_name = os.getenv("DB_FOLDER")
    absolute_path = __file__.split("/")[:-1]
    return f"sqlite:///{absolute_path}/{db_folder}/{db_name}"


def global_init():
    global factory
    global engine

    if factory:
        return

    print(f"db_url: {get_db_url()}")
    engine = sa.create_engine(get_db_url(), echo=False)
    engine.update_execution_options(connect_args={"connect_timeout": 5})
    factory = orm.sessionmaker(bind=engine)

    from . import __all_models

    SqlAlchemyBase.metadata.create_all(engine)


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
