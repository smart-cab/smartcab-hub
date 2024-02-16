import logging

from smartcab.interface.ssh import SSHConnectionError


class Interface:
    def __init__(self, addr):
        self.addr = addr
        self._data = {}

    def get_data(self):
        return self._data

    def update_data(self, data: dict):
        self._data = data


class MQTT(Interface):
    def __init__(
        self, data_unpacker=lambda data: data, subscribe=False, *args, **kwargs
    ):
        super().__init__(*args, **kwargs)
        self._data = {}
        self._data_unpacker = data_unpacker
        self.subscribe = subscribe

    def unpack_data(self, data):
        self._data = self._data_unpacker(data)

    def set(self, value, field=None):
        from .mqtt import MQTTC

        query = f"{self.addr}/set" + ("" if field is None else f"/{field}")
        MQTTC.publish(query, value)

    def update_data(self, data: dict):
        for field, value in data.items():
            self.set(field, value)


class WakeOnWifi(Interface):
    pass


class SSH(Interface):
    def __init__(self, port=22, username="root", password=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.port = port
        self.username = username
        self.password = password

    @property
    def fulladdr(self):
        return f"{self.username}@{self.addr}:{self.port}"

    def execute(self, command):
        import socket
        from .ssh import SSHC

        try:
            SSHC.connect(
                self.addr,
                self.port,
                self.username,
                self.password,
                key_filename="/home/mark/.ssh/hub",
            )
        except socket.gaierror as e:
            logging.error(f"SSH Failed to connect to {self.fulladdr}: {e}")
            raise SSHConnectionError

        output = SSHC.exec_command(command)
        stdout, stderr = map(lambda o: o.read().decode(errors="ignore"), output[1:])

        SSHC.close()

        return stdout, stderr
