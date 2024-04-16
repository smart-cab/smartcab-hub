import os
import logging
from flask import Blueprint
from smartcab.data import db
from smartcab.data.admins import Admin

blueprint = Blueprint(
    name="admission", 
    import_name=__name__
)

@blueprint.route("/get_admins", methods=["GET"])
def get_password():
    admins_phone_numbers = []
    with db.session() as db_sess:
         for admin in db_sess.query(Admin).all():
            admins_phone_numbers.append(admin.phone)
    return {"status": "ok"} | {"admins": admins_phone_numbers}


