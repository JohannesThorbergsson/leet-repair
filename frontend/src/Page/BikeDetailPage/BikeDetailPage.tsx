import {useParams} from "react-router-dom";

export default function BikeDetailPage() {
    const { bikeId } = useParams<{ bikeId: string }>()

    return (
        <>
            <p>Stuff</p>
            {bikeId}
        </>
    )
}