import {Box, Button, TextField, Typography} from "@mui/material";
import React from "react";
import {v4 as uuidv4} from "uuid"
import EditComponents from "../../Component/EditComponents/EditComponents";
import useEditServices from "../../Hooks/useEditServices";
import {ServiceEvent} from "../../model/ServiceEvent";

type AddServiceProps = {
    handleSetServices(services: ServiceEvent[]): void
    services: ServiceEvent[]
}
export default function AddService(props: AddServiceProps) {

    const {handleInputWorkshopName, handleInputDescription, handleInputDate, handleSetNewComponents, clearInputFields,
        newBikeComponents,
        description, workshopName, date } = useEditServices()
    function handleSubmitService(){
        props.handleSetServices([...props.services,
            {description: description, newComponents: newBikeComponents, workshopName:workshopName, date: date, id: uuidv4()}])
        clearInputFields()
    }

    return(
        <>
            <Box sx = {{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                p: 1,
                mt: 2
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}>
                    <Typography variant={"h6"} sx={{m: 1}}>Document a service</Typography>
                </Box>
                <Box sx={{

                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            fullWidth
                            value={description}
                            onChange={handleInputDescription}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Workshop name"
                            fullWidth
                            value={workshopName}
                            onChange={handleInputWorkshopName}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Date"
                            value={date}
                            onChange={handleInputDate}
                            sx={{mt: 1}}
                        />
                        <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Replaced Components</Typography>
                        <EditComponents handleSetComponents={handleSetNewComponents} components={newBikeComponents}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            mt: 1
                        }}>
                            <Button variant={"contained"}
                                    onClick={handleSubmitService}
                                    disabled={description==="" || workshopName==="" || date ===""}>
                                Add Service
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
