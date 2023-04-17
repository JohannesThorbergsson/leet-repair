import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import useAuth, {User} from "../../Hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import LoadingScreen from "../../Component/LoadingScreen/LoadingScreen";
import {useEffect, useState} from "react";
import axios from "axios";

type EditWorkshopPageProps = {
    user: User | null
    isFetching: boolean
    mapApiKey: string
}
export default function EditWorkshopPage(props: EditWorkshopPageProps){
    const user = useAuth(true)
    const {workshopId} = useParams<{workshopId: string}>()
    const [workshop, setWorkshop] = useState()
    const navigate = useNavigate()

    useEffect(()=> {
        if(user && user?.role !== "WORKSHOP") {
            navigate("/")
        } else if (user) {
            axios.get("/api/workshops/" + workshopId)
                .then(r => setWorkshop(r.data))
                .catch((error) => console.error(error))
        }},[user, navigate, workshopId])

    return (
        <>
            {!props.isFetching && workshop && user && user?.role === "WORKSHOP" ?
                <EditWorkshopForm user={props.user} workshopToEdit={workshop} mapApiKey={props.mapApiKey}/>
                :
                <LoadingScreen/>
            }
        </>
    )
}
