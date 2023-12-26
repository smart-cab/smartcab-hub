import sqlalchemy as sa
from sqlalchemy.orm import relationship

from .db import SqlAlchemyBase


class Sensor(SqlAlchemyBase):
    __tablename__ = "sensors"

    id = sa.Column(sa.Integer, primary_key=True)
    type_name = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)

    indicators = relationship("Indicator")


