import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin
from .db import SqlAlchemyBase


class Schedule(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "schedule"

    id = sa.Column(sa.Integer, primary_key=True)
    lesson_start = sa.Column(sa.TIME)
    lesson_end = sa.Column(sa.TIME)
