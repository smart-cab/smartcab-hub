import "./Hiding.scss";

export default function Hiding({ layout }: { layout: string }) {
    if (layout == "all") {
        return <div className="HidingAll" />;
    } else if (layout == "page") {
        return <div className="HidingPage" />;
    } else {
        console.log(
            "Not correct value of 'layout' parameter for hiding component. Use 'all' or 'page'.",
        );
    }
}
