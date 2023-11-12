# Hub's Configuration File Format

Example of complete config:
```yaml
command_blocks:
  - name: "toggle_LW204"
    for: togglers(on/off)
    commands:
      - name: "on"
        set:
          state: "ON"
      - name: "off"
        set:
          state: "OFF"
  - name: "brightness_QWER99"
    for: sliders
    commands:
      - name: "set"
        set:
          brightness: $value

scripts:
  - name: "start_cab"
    content:
      - command/toggle_LW204/on
      - command/brightness_QWER99/set $value=100

services:
  - name: conference_camera
    settings:
      camera: "0x38475ad382fff802"
  - name: smart_chess
    settings:

pages:
  - name: "Scripts"
    private: yes
    section_blocks: 
      - name: "Content block title"
        content:
          - name: "LW204 lamp"
            element:
              type: toggler
              device: "0x54ef441000779c83"
              triggers: command/toggle_LW204
          - name: "QWER99 lamp"
            element:
              type: slider
              device: "0x31d8573583859ac4"
              triggers: command/brightness_QWER99
          - name: "Start cab"
            element:
              type: button
              triggers: script/start_cab
    - name: "User Services"
      private: no
      section_blocks:
        - name: "Distance Lesson Conference"
          content: service/conference_camera
        - name: "Smart Chess"
          content: service/smart_chess
```
