import sqlalchemy as sa
from sqlalchemy.orm import relationship
from .db import SqlAlchemyBase


class Indicator(SqlAlchemyBase):
    __tablename__ = "indicators"

    id = sa.Column(sa.Integer, primary_key=True)
    created_at = sa.Column(sa.TIMESTAMP, server_default=sa.sql.func.now(), nullable=False)
    type_id = sa.Column(sa.Integer, sa.ForeignKey("sensors.id"), nullable=False)
    value = sa.Column(sa.FLOAT)

    sensor = relationship("Sensor")

