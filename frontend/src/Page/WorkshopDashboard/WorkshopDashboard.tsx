import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";

type WorkshopDashboardProps = {
    workshops: Workshop[]
}
export default function WorkshopDashboard(props: WorkshopDashboardProps){
    const user = useAuth(true)
    const navigate = useNavigate()
    const [workshop, setWorkshop]
        = useState(props.workshops.find(workshop=>workshop.username=== user?.username))
    const [workshopLoaded, setWorkshopLoaded] = useState(false)
    console.log(user)
    useEffect(()=> {
        if(user!==null) {
            setWorkshop(props.workshops.find(workshop=>workshop.username=== user.username))
            setWorkshopLoaded(true)
        }
        //eslint-disable-next-line
    }, [props.workshops])
    useEffect(()=> {
        if(user!==null) {
            setWorkshop(props.workshops.find(workshop=>workshop.username=== user.username))
        }
        //eslint-disable-next-line
    }, [props.workshops, navigate, user])
    useEffect(()=>{
        if(user && workshopLoaded && !workshop) {
            navigate("/workshops/setup")
        }
    }, [user, workshop, navigate, workshopLoaded])

    return(
            <>
                <ResponsiveAppBar/>
                <Button variant={"contained"} onClick={()=> navigate("/workshops/edit/"+workshop?.id)}>
                    Manage Workshop
                </Button>
            </>
    )
}
