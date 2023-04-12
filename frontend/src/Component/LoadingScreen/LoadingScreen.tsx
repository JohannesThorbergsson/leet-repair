import "./LoadingScreen.css";
import wheel from "./bikeWheel.png"
import {useState} from "react";

export default function LoadingScreen() {
    const [wheelLoaded, setWheelLoaded] = useState(false)

    return (
        <div className={"loading-screen"}>
            <img src={wheel} className={"spinner"} alt={"wheel"}
                 style={{display: wheelLoaded ? "block" : "none"}}
                 onLoad={()=>setWheelLoaded(true)}/>
        </div>
    );
}
