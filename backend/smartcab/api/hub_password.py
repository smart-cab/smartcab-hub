import os
import logging
from flask import Blueprint, request
from smartcab.data import db
from smartcab.data.hub_password import HubPassword

blueprint = Blueprint(
    name="hub_password", 
    import_name=__name__
)

@blueprint.route("/get_password", methods=["GET"])
def get_password():
    with db.session() as db_sess:
        if not (hub_password := db_sess.query(HubPassword).filter(HubPassword.id == 1).first()):
            logging.error(f"Not find password")
            return {"status": "error: server can't find password"}
    return {"status": "ok"} | {"password": hub_password.password}



@blueprint.route("/update_password", methods=["POST", "GET"])
def update_password():
    new_password = request.get_json()["password"]
    with db.session() as db_sess:
        if not (password := db_sess.query(HubPassword).filter_by(id=1).first()):
            logging.error("Can't set new password")
            return {"status": "error"}
        password.password = new_password
        db_sess.commit()
    logging.info("Password was updated")
    return {"status": "ok"} 

