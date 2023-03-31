import {ServiceOrder} from "../../model/ServiceOrder";
import {Box, CardContent, Typography} from "@mui/material";
import ComponentTable from "../ComponentTable/ComponentTable";
import React from "react";
import moment from "moment";

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
           <Box sx={{
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'space-between'
           }}>
               <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                   {moment(props.order.date).format('DD.MM.YYYY')}
               </Typography>
               <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                   {props.order.workshop}
               </Typography>
               <Typography variant="subtitle2" component="h6" fontWeight={"small"}>
                   {"Status: " + status}
               </Typography>
           </Box>
           <Typography variant="h4" fontWeight={"medium"} sx={{mt: 1}}>
               {props.order.description}
           </Typography>
           <Typography variant="subtitle1" component="h6" fontWeight={"medium"}>
               {props.order.status !=="DONE"? "Ordered Components:": "Installed Components:"}
           </Typography>
           <ComponentTable components={props.order.componentsToReplace} showAge={false}/>
       </CardContent>
   )
}
