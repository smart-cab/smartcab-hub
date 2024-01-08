import sqlalchemy as sa
from sqlalchemy.orm import relationship

from .db import SqlAlchemyBase


class EvalType(SqlAlchemyBase):
    __tablename__ = "eval_types"

    id = sa.Column(sa.Integer, primary_key=True)
    eval_type = sa.Column(sa.VARCHAR(100), nullable=False, unique=True)

    lessons = relationship("Lesson")

