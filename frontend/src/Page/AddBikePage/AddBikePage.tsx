import EditBikeForm from "../../Component/EditBikeForm/EditBikeForm";
import React from "react";
import {Bike} from "../../model/Bike";
import useAuth from "../../Hooks/useAuth";

type AddBikePageProps = {
    bikes: Bike[]
    updateBikeList(bikes: Bike[]): void
}
export default function AddBikePage(props: AddBikePageProps) {
    useAuth(true)
    return (
        <>
            <EditBikeForm editMode={false} bikes={props.bikes} updateBikeList={props.updateBikeList}/>
        </>
    )
}
