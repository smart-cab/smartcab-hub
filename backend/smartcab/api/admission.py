import os
import logging
from flask import Blueprint, request
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


@blueprint.route("/get_my_status", methods=["GET"])
def get_my_status():
    response = request.get_json()
    with db.session() as db_sess:
        admin = db_sess.query(Admin).filter(Admin.phone == response["phone_number"]).first()
        if not admin:
            return {"status": "error", "description": "You are not admin"}
        print(admin.is_prime, admin.phone)
        return {"status": "ok"} | {"is_prime": admin.is_prime}


@blueprint.route("/add_admin", methods=["POST", "GET"])
def add_admin():
    response = request.get_json()
    print(response)
    with db.session() as db_sess:
        if db_sess.query(Admin).filter(Admin.phone==response["phone_number"]).first():
            return {"status": "ok"}
        admin = Admin(phone=response["phone_number"], is_prime=False)
        db_sess.add(admin)
        db_sess.commit()

    return {"status": "ok"} 


@blueprint.route("/remove_admin", methods=["DELETE"])
def remove_admin():
    response = request.get_json()
    phone = response["phone_number"]
    with db.session() as db_sess:
        admin = db_sess.query(Admin).filter(Admin.phone == phone).first()

        if not admin:
            return {"status": "error", "description": "You are not admin"}

        db_sess.delete(admin)
        db_sess.commit()

    return {"status": "ok"} 

