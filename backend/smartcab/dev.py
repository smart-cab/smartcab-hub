from copy import deepcopy
from typing import Iterable, Optional

from smartcab import interface


class Device:
    def __init__(self, interfaces: Iterable[interface.Interface]):
        self.interfaces = interfaces

    def get_interface(self, cls) -> Optional[interface.Interface]:
        return next(filter(lambda interface: type(interface) is cls, self.interfaces), None)


DEVICES = {
    "sensors1": Device(
        interfaces=(
            interface.MQTT(
                addr="zigbee2mqtt/0x54ef441000779c83",
                subscribe=True,
                data_unpacker=lambda data: {
                    "battery": int(data["battery"]),
                    "temperature": int(data["temperature"]),
                    "humidity": int(data["humidity"]),
                    "pressure": int(data["pressure"]),
                },
            ),
        ),
    ),
    "sensors2": Device(
        interfaces=(
            interface.MQTT(
                addr="zigbee2mqtt/0xa4c138971597b830",
                subscribe=True,
                data_unpacker=lambda data: {
                    "co2": int(data["co2"]),
                },
            ),
        ),
    ),
}

