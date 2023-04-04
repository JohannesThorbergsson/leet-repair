import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";

type WorkshopDashboardProps = {
    workshops: Workshop[]
}
export default function WorkshopDashboard(props: WorkshopDashboardProps){
    const user = useAuth(true)
    const navigate = useNavigate()
    const workshop = props.workshops.find(workshop=> workshop.username===user?.username)
    !workshop && navigate("/workshops/setup")

    return(
            <>
            <ResponsiveAppBar/>
            Workshop Dashboard
            </>

    )
}
