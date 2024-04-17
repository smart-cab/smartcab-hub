import os
from smartcab.data import db
import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin

from .db import SqlAlchemyBase


class Admin(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "admins"

    id = sa.Column(sa.Integer, primary_key=True)
    phone = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)
    is_prime = sa.Column(sa.Boolean, nullable=False, default=False, autoincrement="auto")


def init_admins() -> list[str]:
    id = 1
    was_added = []
    with db.session() as db_sess:
        while (phone := os.getenv(f"ADMINS_PHONE_{id}")):
            new_admin = Admin(phone=phone, is_prime=True)
            db_sess.add(new_admin)
            db_sess.commit()
            was_added.append(phone)
            id += 1
    return was_added
