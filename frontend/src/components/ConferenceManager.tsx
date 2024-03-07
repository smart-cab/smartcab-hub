import Header from "./Header";

export default function Statistics() {
    return (
        <div>
            <Header />
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
                    src="http://127.0.0.1:8787"
                ></iframe>
            </div>
        </div>
    );
}
