import sqlalchemy as sa
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from .db import SqlAlchemyBase


class Lesson(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "lessons"

    id = sa.Column(sa.Integer, primary_key=True)
    created_at = sa.Column(sa.TIMESTAMP, server_default=sa.sql.func.now(), nullable=False)
    eval_id = sa.Column(sa.Integer, sa.ForeignKey("eval_types.id"), nullable=False)

    eval = relationship("EvalType")
