import yaml
import json

from redis import Redis

from smartcab.interface import MQTT, SSH


_INTERFACE_MAPPINGS = {"mqtt": MQTT, "ssh": SSH}


class DeviceMap:
    def __init__(self):
        self._db = Redis(host="redis", port=6379, decode_responses=True)

    def append_from_file(self, path):
        with open(path) as file:
            object = yaml.load(file, Loader=yaml.Loader)
            for key, value in object.items():
                key = f"device:{key}"
                self._db.hset(key, mapping=value)
                self._db.hset(key, "data", "{}")

    def get_data(self, device_id, interface_id):
        name = f"device:{device_id}/{interface_id}"
        return json.loads(self._db.hget(name, "data"))

    def update_data(self, device_id, interface_name, data):
        name = f"device:{device_id}/{interface_name}"
        self._db.hset(name, "data", json.dumps(data, indent=None))

    def _get_interface(self, name):
        return _INTERFACE_MAPPINGS[name.split("/")[1]](**self._db.hgetall(name))

    def get_interface(self, device_id: str, interface_name: str):
        name = f"device:{device_id}/{interface_name}"
        return self._get_interface(name)

    def interfaces(self, interface_name: str):
        for name in self._db.keys(f"device:*/{interface_name}"):
            yield self._get_interface(name)


devmap = DeviceMap()
