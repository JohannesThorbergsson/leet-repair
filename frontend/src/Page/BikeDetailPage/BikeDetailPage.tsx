import {useParams} from "react-router-dom";
import {Bike} from "../../model/Bike";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";

type Props = {
    bikes: Bike[]
}
export default function BikeDetailPage(props: Props) {
    useAuth(true)
    const { bikeId } = useParams<{ bikeId: string }>()

    return (
        <>
            <ResponsiveAppBar/>
            {props.bikes.find(b => b.id===bikeId)?.modelName}
        </>
    )
}