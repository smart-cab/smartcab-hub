import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin
from smartcab.utils import get_default_eval_types
from smartcab.data import db

from .db import SqlAlchemyBase


class EvalType(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "eval_types"

    id = sa.Column(sa.Integer, primary_key=True)
    label = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)


def init_base_types():
    with db.session() as db_sess:
        for type_label in get_default_eval_types():
            eval_type = EvalType(label=type_label)
            db_sess.add(eval_type)
        db_sess.commit()
