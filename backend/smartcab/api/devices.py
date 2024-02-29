# import firewall
from smartcab.dev import DEVICES
from smartcab import interface
from flask import abort, request, Blueprint
from paramiko import SSHException


blueprint = Blueprint(
    name="devices", 
    import_name=__name__
)


@blueprint.route("/status", methods=["GET"])
def status():
    return {"status": "ok"}



@blueprint.route("/mqtt/<device_id>", methods=["GET"])
def mqtt_get(device_id):
    device = DEVICES.get(device_id, None)
    if device is None:
        abort(404)

    mqtti = device.get_interface(interface.MQTT)
    if mqtti is None:
        abort(404)

    return {"status": "ok"} | mqtti.get_data()


@blueprint.route("/mqtt/<device_id>", methods=["POST"])
def mqtt_publish(device_id):
    device = DEVICES.get(device_id, None)
    if device is None:
        abort(404)

    mqtti = device.get_interface(interface.MQTT)
    if mqtti is None:
        abort(404)

    field = request.args.get("field", None)
    value = request.args.get("value")
    mqtti.set(value, field)
    return {"status": "ok"}


# @firewall.apply
@blueprint.route("/ssh/<device_id>", methods=["GET"])
async def ssh_execute(device_id):
    device = DEVICES.get(device_id, None)
    if device is None:
        abort(404)

    sshi = device.get_interface(interface.SSH)
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

