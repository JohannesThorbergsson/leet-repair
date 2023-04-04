import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type WorkshopDashboardProps = {
    workshops: Workshop[]
}
export default function WorkshopDashboard(props: WorkshopDashboardProps){
    const user = useAuth(true)
    const navigate = useNavigate()
    const workshop = props.workshops.find(workshop=> workshop.username===user?.username)
    console.log(workshop)
    useEffect(()=>{
        if(user && !workshop) {
            navigate("/workshops/setup")
        }
    }, [user, workshop])

    return(
            <>
            <ResponsiveAppBar/>
            Workshop Dashboard
            </>

    )
}
