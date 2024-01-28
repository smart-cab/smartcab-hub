import sqlalchemy as sa
from sqlalchemy.orm import relationship
from smartcab.data import db

from .db import SqlAlchemyBase


class EvalType(SqlAlchemyBase):
    __tablename__ = "eval_types"

    id = sa.Column(sa.Integer, primary_key=True)
    eval_type = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)

    lessons = relationship("Lesson")


def init_base_types():
    beast = EvalType(eval_type="beast")
    thinking = EvalType(eval_type="thinking")
    sleep = EvalType(eval_type="sleep")
    headboom = EvalType(eval_type="headboom")

    with db.session() as db_sess:
        db_sess.add(beast)
        db_sess.add(thinking)
        db_sess.add(sleep)
        db_sess.add(headboom)
        db_sess.commit()
