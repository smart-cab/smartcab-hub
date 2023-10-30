import paho.mqtt.client as mqtt
import json


class Sensor:
    temperature: float
    humidity: float
    battery: int


BROKER_URL = "192.168.43.107"
BROKER_PORT = 1883
SENSOR = Sensor()

def on_connect(client, userdata, flags, rc):
    print(f"Connected With Result Code {rc}")
    if rc == 0:
        print("Connection successful!")
    elif rc == 1:
        print("Connection error – incorrect protocol version")
    elif rc == 2:
        print("Connection error – invalid client identifier")
    elif rc == 3:
        print("Connection error – server unavailable")
    elif rc == 4:
        print("Connection error – bad username or password")
    elif rc == 5:
        print("Connection error – not authorised")
    else:
        print("I don't know what happening...")


def on_disconnect(client, userdata, rc):
    print("Client successful disconnected")


def on_message(client, userdata, message):
    data = json.loads(message.payload.decode())
    sensor.battery = data["battery"]
    sensor.temperature = data["temperature"]
    sensor.humidity = data["humidity"]
    print("Message Recieved: " + message.payload.decode())


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(BROKER_URL, BROKER_PORT)

msg = client.subscribe("zigbee2mqtt/0x54ef441000779c83", qos=1)
client.loop_forever()
