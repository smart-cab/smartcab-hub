# import firewall
from smartcab.dev import devmap
from flask import abort, request, Blueprint
from paramiko import SSHException


blueprint = Blueprint(name="devices", import_name=__name__)


@blueprint.route("/status", methods=["GET"])
def status():
    return {"status": "ok"}


@blueprint.route("/mqtt/<device_id>", methods=["GET"])
def mqtt_get(device_id):
    data = devmap.get_data(device_id, "mqtt")
    return {"status": "ok"} | data


@blueprint.route("/mqtt/<device_id>", methods=["POST"])
def mqtt_publish(device_id):
    mqtti = devmap.get_interface(device_id, "mqtt")
    field = request.args.get("field", None)
    value = request.args.get("value")
    mqtti.set(value, field)
    return {"status": "ok"}


# @firewall.apply
@blueprint.route("/ssh/<device_id>", methods=["GET"])
async def ssh_execute(device_id):
    sshi = devmap.get_interface(device_id, "ssh")
    command = request.args.get("command", None)

    if sshi is None or command is None:
        abort(404)

    try:
        await sshi.execute(command)
    except SSHException:
        return {"status": "error", "error": "failed to execute ssh command"}

    return {
        "status": "ok",
    }
