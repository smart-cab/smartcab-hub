import os
from smartcab.data import db
import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin

from .db import SqlAlchemyBase


class HubPassword(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "hub_password"

    id = sa.Column(sa.Integer, primary_key=True)
    password = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)


def init_base_password():
    init_password = HubPassword(password=os.getenv("INIT_PASSWORD"))
    with db.session() as db_sess:
        db_sess.add(init_password)
        db_sess.commit()
