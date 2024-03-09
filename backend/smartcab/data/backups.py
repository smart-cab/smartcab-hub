from datetime import datetime
import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin
from .db import SqlAlchemyBase


class Backup(SqlAlchemyBase, SerializerMixin):
    __tablename__ = "backups"

    id = sa.Column(sa.Integer, primary_key=True)
    created_at = sa.Column(sa.TIMESTAMP, server_default=sa.sql.func.now(), nullable=False)
    config = sa.Column(sa.TEXT, nullable=False)
