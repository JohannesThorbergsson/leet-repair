import React, {useState} from "react";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {ServiceOrder} from "../../model/ServiceOrder";
import ComponentTable from "../ComponentTable/ComponentTable";
import {useNavigate} from "react-router-dom";
import UpdateOrderStatusDialog from "../UpdateOrderStatusDialog/UpdateOrderStatusDialog";

type OrderCardProps = {
    order: ServiceOrder
}

export default function OrderCard(props: OrderCardProps){
    const navigate = useNavigate()
    function getStatusDisplayText() {
        switch (props.order.status) {
            case "OPEN":
                return "Open"
            case "IN_PROGRESS":
                return "In Progress"
            case "READY_FOR_PICKUP":
                return "Ready for Pickup"
            case "DONE":
                return "Done"
            default:
                return props.order.status
        }
    }
    const [status, setStatus] = useState(getStatusDisplayText())
    function handleUpdateStatus(newStatus: string){
        setStatus(newStatus)
    }
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h4" fontWeight={"medium"}>
                    {props.order.description}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                        Contractor: {props.order.workshop}
                    </Typography>
                    <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                        {"Status: " + status}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
                    New Components:
                </Typography>
                <ComponentTable components={props.order.componentsToReplace} showAge={false}/>
            </CardContent>
            <Box sx={{
                pb: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'}}>
                {props.order.status==="OPEN" &&
                    <Button variant={"contained"}
                            sx={{width: 1/2, mr: 1 , ml: 2}}
                            onClick={()=> navigate("/orders/" + props.order.id)}>
                        Edit Order
                    </Button>
                }
                <Button variant={"contained"} sx={{width: 1/2, mr: 2 , ml: 1}}>
                    Update Status
                </Button>
            </Box>
        </React.Fragment>
    );
    return (
        <div>
            <Card variant={"outlined"} sx={{
                m: 2,
                boxShadow: 1
            }}>{card}</Card>
            <UpdateOrderStatusDialog
                id={"test"} keepMounted
                open={true}
                status={status}
                handleUpdateStatus={handleUpdateStatus}/>
        </div>
    )
}
