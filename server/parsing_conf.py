import yaml


with open('config.example.yaml') as f:
    data = yaml.safe_load(f)
    print(data)

