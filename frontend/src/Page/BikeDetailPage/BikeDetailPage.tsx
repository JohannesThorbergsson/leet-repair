import {useParams} from "react-router-dom";
import {Bike} from "../../model/Bike";

type Props = {
    bikes: Bike[]
}
export default function BikeDetailPage(props: Props) {
    const { bikeId } = useParams<{ bikeId: string }>()

    return (
        <>
            <p>Stuff</p>
            {props.bikes.find(b => b.id===bikeId)?.modelName}
        </>
    )
}