import {ServiceOrder} from "../../model/ServiceOrder";
import {Box, CardContent, Typography} from "@mui/material";
import ComponentTable from "../ComponentTable/ComponentTable";
import React from "react";

type OrderCardContentProps = {
    order: ServiceOrder
}

export default function OrderCardContent(props: OrderCardContentProps){
    const status = getStatusDisplayText()
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
   return (
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
   )
}
