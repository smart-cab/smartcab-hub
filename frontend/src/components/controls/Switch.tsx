import axios from "axios";
import { Switch } from "antd";
import "./Switch.scss";

function useSocket({ checked, url }: { checked: boolean; url: string }) {
    let state;
    if (checked) {
        state = "ON";
    } else {
        state = "OFF";
    }

    axios
        .post(url, null, { params: { value: state } })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

function MySwitch({ url }: { url: string }) {
    return (
        <Switch
            onChange={(checked, _event) => useSocket({ checked, url })}
            className="MySwitch"
        />
    );
}

export default MySwitch;
