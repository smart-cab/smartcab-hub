import sqlalchemy as sa
from sqlalchemy.orm import relationship
from .db import SqlAlchemyBase


class Lesson(SqlAlchemyBase):
    __tablename__ = "lessons"

    id = sa.Column(sa.Integer, primary_key=True)
    created_at = sa.Column(sa.TIMESTAMP, server_default=sa.sql.func.now(), nullable=False)
    students_class = sa.Column(sa.VARCHAR(50))
    eval_id = sa.Column(sa.Integer, sa.ForeignKey("eval_types.id"), nullable=False)
    count = sa.Column(sa.Integer)

    eval = relationship("EvalType")
