import json


class Interface:
    def __init__(self, name=None, addr=None, data=None):
        if data is None:
            self._data = {}
        elif data is dict:
            self._data = data
        elif data is str:
            self._data = json.loads(data)
        self.name = name
        self.addr = addr


class MQTT(Interface):
    def __init__(self, flags=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.flags = set() if flags is None else flags.split(",")
        self.subscribe = "subscribe" in self.flags

    def set(self, value, field=None):
        from .mqtt import MQTTC

        query = f"{self.addr}/set" + ("" if field is None else f"/{field}")
        MQTTC.publish(query, value)


class SSH(Interface):
    def __init__(self, port=22, username="test", password=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.port = port
        self.username = username
        self.password = password

    @property
    def fulladdr(self):
        return f"{self.username}@{self.addr}:{self.port}"

    async def execute(self, command):
        import asyncssh

        async with asyncssh.connect(
            self.addr,
            username=self.username,
            known_hosts=None,
            client_keys=["/app/certs/hub"],
        ) as conn:
            result = await conn.run(command)
            if result is None:
                return "", ""

        return result.stdout, result.stderr
