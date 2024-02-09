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
        # print("-------", query)
        MQTTC.publish(query, value)

    def update_data(self, data: dict):
        for field, value in data.items():
            self.set(field, value)


class WakeOnWifi(Interface):
    pass


class SSH(Interface):
    pass
