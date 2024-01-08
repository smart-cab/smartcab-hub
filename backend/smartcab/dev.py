from copy import deepcopy
from typing import Iterable, Optional

from smartcab import interface


class Device:
    def __init__(self, interfaces: Iterable[interface.Interface]):
        self.interfaces = interfaces

    def get_interface(self, cls) -> Optional[interface.Interface]:
        return next(filter(lambda interface: interface is cls, self.interfaces), None)


DEVICES = {
    "sensors": Device(
        interfaces=(
            interface.MQTT(
                addr="zigbee2mqtt/0x54ef441000779c83",
                subscribe=True,
                data_unpacker=lambda data: {
                    "battery": int(data["baterry"]),
                    "temperature": int(data["temperature"]),
                    "humidity": int(data["humidity"]),
                    "pressure": int(data["pressure"]),
                    "co2": float(data["co2"]),
                },
            ),
        ),
    ),
}
