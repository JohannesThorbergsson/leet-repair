import useBikes from "../../Hooks/useBikes";
import BikeCard from "../../Component/BikeCard/BikeCard";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";

export default function BikeGallery() {
    useAuth(true)
    const {bikes} = useBikes()
    return (
        <>
            <ResponsiveAppBar/>
            <h1>Your Bikes:</h1>
            <div>
                {bikes.map(b => <BikeCard key={b.id} bike={b}/>)}
            </div>
        </>
    )
}