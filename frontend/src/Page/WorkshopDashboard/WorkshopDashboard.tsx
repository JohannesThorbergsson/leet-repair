import useAuth from "../../Hooks/useAuth";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Workshop} from "../../model/Workshop";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";

type WorkshopDashboardProps = {
    workshops: Workshop[]
}
export default function WorkshopDashboard(props: WorkshopDashboardProps){
    const user = useAuth(true)
    const navigate = useNavigate()
    const [workshop, setWorkshop]
        = useState(props.workshops.find(workshop=>workshop.username=== user?.username))

    useEffect(()=> {
        if(user!==null) {
            setWorkshop(props.workshops.find(workshop=>workshop.username=== user.username))
        }
        //eslint-disable-next-line
    }, [props.workshops, navigate, user])

    return(
            <>
                <ResponsiveAppBar/>
                {workshop?
                    <Box sx={{display:'flex', flexDirection: 'column', alignContent: 'center', m:2}}>
                        <Button variant={"contained"} onClick={()=> navigate("/workshops/edit/"+workshop?.id)}>
                            Manage Workshop
                        </Button>
                    </Box>:
                    <Box sx={{display:'flex', flexDirection: 'column', alignContent: 'center', m: 2}}>
                        <Button variant={"contained"} onClick={()=>navigate("/workshops/setup")}>
                            Create Profile
                        </Button>
                    </Box>
                }
            </>
    )
}
