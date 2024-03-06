import sqlalchemy as sa
from sqlalchemy.orm import relationship
from smartcab.data import db

from .db import SqlAlchemyBase


class EvalType(SqlAlchemyBase):
    __tablename__ = "eval_types"

    id = sa.Column(sa.Integer, primary_key=True)
    label = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)

    lessons = relationship("Lesson")


def init_base_types():
    beast = EvalType(label="beast")
    thinking = EvalType(label="thinking")
    sleep = EvalType(label="sleep")
    headboom = EvalType(label="headboom")

    with db.session() as db_sess:
        db_sess.add(beast)
        db_sess.add(thinking)
        db_sess.add(sleep)
        db_sess.add(headboom)
        db_sess.commit()
