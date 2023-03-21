import Layout from "../../Component/Layout/Layout";
import useBikes from "../../Hooks/useBikes";
import BikeCard from "../../Component/BikeCard/BikeCard";

export default function BikeGallery() {
    const {bikes} = useBikes()
    return (
        <Layout>
            <h1>Your Bikes:</h1>
            <div>
                {bikes.map(b => <BikeCard key={b.id} bike={b}/>)}
            </div>
        </Layout>
    )
}