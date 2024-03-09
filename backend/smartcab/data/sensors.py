import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship

from .db import SqlAlchemyBase


class Sensor(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "sensors"

    id = sa.Column(sa.Integer, primary_key=True)
    type_name = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)



