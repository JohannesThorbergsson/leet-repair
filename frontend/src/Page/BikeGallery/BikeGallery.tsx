import useBikes from "../../Hooks/useBikes";
import BikeCard from "../../Component/BikeCard/BikeCard";
import ResponsiveAppBar from "../../ResponsiveAppBar";

export default function BikeGallery() {
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