import "./LoadingScreen.css";
import wheel from "./bikeWheel.png"

export default function LoadingScreen() {
    return (
        <div className={"loading-screen"}>
            <div className={"img-container"}>
                <img src={wheel} className={"spinner"} alt={"wheel"}/>
            </div>
        </div>
    );
}
