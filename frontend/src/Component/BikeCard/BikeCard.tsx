import {Bike} from "../../model/Bike";

type Props = {
    bike: Bike
}

export default function BikeCard(props: Props) {
    return (
        <div>
            <h2>{props.bike.modelName}</h2>
            <h3>{props.bike.mileage}</h3>
            {props.bike.components.map(c => <p key={c.type}>{c.type}</p>)}
        </div>
    )
}