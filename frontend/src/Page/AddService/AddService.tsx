import {Box, TextField, Typography} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditComponents from "../../Component/EditComponents/EditComponents";
import useAddBike from "../../Hooks/useAddBike";

export default function AddService() {
    const[description, setDescription] =useState<string>("")
    const[workshopName, setWorkshopName] = useState<string>("")
    const[date, setDate] = useState<string>("")
    const {components, handleDeleteComponent, handleSubmitNewComponent, handleInputComponentName, handleInputComponentAge, handleInputComponentModel, newComponentCategory, newComponentAge, newComponentModel} = useAddBike()

    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>){
        setWorkshopName(event.target.value)
    }
    function handleInputDate(event: ChangeEvent<HTMLInputElement>){
        setDate(event.target.value)
    }
    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                    <Typography variant={"h4"} sx={{m: 1}}>Document a service</Typography>
                </Box>
            <Box sx={{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                m: 1,
                p: 2
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
                        onChange={handleInputDescription}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Workshop name"
                        fullWidth
                        onChange={handleInputWorkshopName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Date"
                        onChange={handleInputDate}
                        sx={{mt: 1}}
                    />
                    <EditComponents components={components}
                                    handleDeleteComponent={handleDeleteComponent}
                                    handleSubmitNewComponent={handleSubmitNewComponent} handleInputComponentName={} handleInputComponentModel={} handleInputComponentAge={} newComponentCategory={} newComponentModel={} newComponentAge={} newComponentAgeValue={}

                </Box>
            </Box>
        </>
    )
}