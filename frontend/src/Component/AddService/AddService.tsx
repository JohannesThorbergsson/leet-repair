import {Box, TextField, Typography} from "@mui/material";
import React, {ChangeEvent} from "react";
import EditComponents from "../EditComponents/EditComponents";
import {ServiceEvent} from "../../model/ServiceEvent";
import {Component} from "../../model/Component";

type AddServiceProps = {
    handleInputDescription(event: ChangeEvent<HTMLInputElement>): void
    description: string
    handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>): void
    workshopName: string
    handleInputDate(event: ChangeEvent<HTMLInputElement>): void
    date: string
    handleSetServices(services: ServiceEvent[]): void
    services: ServiceEvent[]
    handleSetNewComponents(components: Component[]): void
    newBikeComponents: Component[]
    handleSubmitService(): void
}
export default function AddService(props: AddServiceProps) {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <TextField
                required
                id="outlined-required"
                label="Description"
                fullWidth
                value={props.description}
                onChange={props.handleInputDescription}
                sx={{mt: 1}}
            />
            <TextField
                required
                id="outlined-required"
                label="Workshop name"
                fullWidth
                value={props.workshopName}
                onChange={props.handleInputWorkshopName}
                sx={{mt: 1}}
            />
            <TextField
                required
                id="date-input"
                type={"date"}
                label="Date"
                value={props.date}
                onChange={props.handleInputDate}
                inputProps={{
                    pattern: '\\d{4}-\\d{2}-\\d{2}',
                    placeholder: 'YYYY-MM-DD'
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{mt: 1}}
            />
            <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1, textAlign: 'center'}}>
                Replaced Components
            </Typography>
            <EditComponents handleSetComponents={props.handleSetNewComponents} components={props.newBikeComponents}/>
        </Box>
    )
}
