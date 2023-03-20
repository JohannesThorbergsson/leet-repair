import {Workshop} from "../../model/Workshop";

type Props = {
    workshop: Workshop
}
export default function WorkshopCard(props: Props) {
    return (
        <div>
            <h1>{props.workshop.name}</h1>
            {props.workshop.services.map(s => <p key={s}>{s}</p> )}
        </div>
    )
}