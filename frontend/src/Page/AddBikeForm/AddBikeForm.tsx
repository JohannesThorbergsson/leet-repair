import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import React from "react";
import {v4 as uuidv4} from "uuid"
import useAddBike from "../../Hooks/useAddBike";
import EditComponents from "../../Component/EditComponents/EditComponents";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import AddService from "../AddService/AddService";

export default function AddBikeForm() {
    const {
        mileageFieldValue,
        components,
        mileage,
        modelName,
        services,
        handleInputMileage,
        handleInputModelName,
        handleSetServices,
        handleSubmitBike,
        handleSetInstalledComponents,
        deleteService,
        handleCancel
    } = useAddBike()
    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Typography variant={"h4"} sx={{m: 1}}>New Bike</Typography>
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
                        label="Model Name"
                        fullWidth
                        value={modelName}
                        onChange={handleInputModelName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mileage"
                        error={!/^\d+$/.test(mileageFieldValue.trim()) && mileageFieldValue!==""}
                        helperText={(!/^\d+$/.test(mileageFieldValue.trim()) && mileageFieldValue!=="")
                            && "Must be a numeric value"}
                        onChange={handleInputMileage}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                        }}
                        sx={{mt: 1}}
                    />
                </Box>
                <Box sx={{
                    justifyContent: 'start',
                    display: 'flex',
                    flexDirection: 'column',}}>
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Installed Components</Typography>
                    <EditComponents components={components} handleSetComponents={handleSetInstalledComponents}/>
                </Box>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    {services.map(service => <ServiceCard key={uuidv4()} service={service} deleteService={deleteService}/>)}
                    <AddService handleSetServices={handleSetServices} services={services}/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    mt: 1
                }}>
                    <Button variant={"contained"} onClick={handleSubmitBike}
                        disabled ={modelName==="" || mileage===undefined || !/^\d+$/.test(mileageFieldValue.trim())}
                    >Save</Button>
                    <Button variant={"contained"} onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
        </>
    )
}
