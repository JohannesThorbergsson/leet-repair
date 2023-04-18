import {Bike} from "../../model/Bike";
import useAuth from "../../Hooks/useAuth";
import {useParams} from "react-router-dom";
import EditBikeForm from "../../Component/EditBikeForm/EditBikeForm";
import {Box} from "@mui/material";
import InvalidId from "../../Component/InvalidId/InvalidId";
import React from "react";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";

type EditBikePageProps = {
    bikes: Bike[]
    isFetching: boolean
    updateBikeList(bikes: Bike[]): void
}
export default function EditBikePage(props: EditBikePageProps){
    useAuth(true)
    const { bikeId } = useParams<{ bikeId: string }>()
    const bike: Bike | undefined = props.bikes.find((bike) => bike.id === bikeId);
    const content = bike ?
        <Box>
            <EditBikeForm editMode={true}
                          bikes={props.bikes}
                          updateBikeList={props.updateBikeList}
                          bikeToEdit={bike}/>
        </Box>:
        <InvalidId/>

    return (
        <>
            {!props.isFetching ? content : <LoadingScreen/>}
        </>
    )
}
