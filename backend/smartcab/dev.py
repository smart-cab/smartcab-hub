from typing import Iterable, Optional

from smartcab import interface


class Device:
    def __init__(self, interfaces: Iterable[interface.Interface]):
        self.interfaces = interfaces

    def get_interface(self, cls) -> Optional[interface.Interface]:
        return next(
            filter(lambda interface: type(interface) is cls, self.interfaces), None
        )


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
                    "temperature": int(data["temperature"]),
                    "humidity": int(data["humidity"]),
                },
            ),
        ),
    ),
    "power_socket1": Device(
        interfaces=(
            interface.MQTT(
                addr="zigbee2mqtt/0xa4c1382d21ae8016",
            ),
        ),
    ),
    "curtains_roller1": Device(
        interfaces=(
            interface.MQTT(
                addr="zigbee2mqtt/0x54ef441000841506",
            ),
        ),
    ),
    "pc1": Device(interfaces=(interface.SSH(addr="192.168.1.180"),)),
    "pc2": Device(interfaces=(interface.SSH(addr="192.168.2.13"),)),
    "pc3": Device(interfaces=(interface.SSH(addr="192.168.1.176"),)),
    "pc4": Device(interfaces=(interface.SSH(addr="192.168.1.174"),)),
    "pc5": Device(interfaces=(interface.SSH(addr="192.168.1.186"),)),
    "pc6": Device(interfaces=(interface.SSH(addr="192.168.1.187"),)),
    "pc7": Device(interfaces=(interface.SSH(addr="192.168.1.183"),)),
    "pc8": Device(interfaces=(interface.SSH(addr="192.168.1.184"),)),
    "pc9": Device(interfaces=(interface.SSH(addr="192.168.1.190"),)),
    "pc10": Device(interfaces=(interface.SSH(addr="192.168.1.201"),)),
    "pc11": Device(interfaces=(interface.SSH(addr="192.168.1.178"),)),
    "pc12": Device(interfaces=(interface.SSH(addr="192.168.1.185"),)),
    "pc13": Device(interfaces=(interface.SSH(addr="192.168.1.189"),)),
    "pc14": Device(interfaces=(interface.SSH(addr="192.168.1.177"),)),
    "pc15": Device(interfaces=(interface.SSH(addr="192.168.1.193"),)),
}
