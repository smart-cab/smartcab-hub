import { CONFCAM_BACKADDR } from "../const";

export default function ConferenceManager() {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: "2cm",
                }}
            >
                <iframe
                    style={{
                        display: "flex",
                        backgroundColor: "rgba(202, 200, 200, 0.4)",
                        width: "70vw",
                        height: "80vh",
                        marginTop: "1em",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: "10px",
                        border: "none",
                    }}
                    src={`${CONFCAM_BACKADDR}?token=12345678`}
                ></iframe>
            </div>
        </div>
    );
}
