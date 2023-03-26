import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import React from "react";
import {v4 as uuidv4} from "uuid"
import useEditBike from "../../Hooks/useEditBike";
import EditComponents from "../EditComponents/EditComponents";
import ServiceCard from "../ServiceCard/ServiceCard";
import AddService from "../AddService/AddService";
import useAuth from "../../Hooks/useAuth";
import {Bike} from "../../model/Bike";

type EditBikeFormProps = {
    editMode: boolean
    bikes: Bike[]
    bikeToEdit?: Bike
    updateBikeList(bikes: Bike[]): void
}
export default function EditBikeForm(props: EditBikeFormProps) {
    useAuth(true)
    const {
        editBikeFormState,
        handleInputMileage,
        handleInputModelName,
        handleSetServices,
        handleSubmitBike,
        handleSetInstalledComponents,
        deleteService,
        handleCancel
    } = useEditBike(props)

    return(
        <>
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
                        value={editBikeFormState.modelName}
                        onChange={handleInputModelName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mileage"
                        value={editBikeFormState.mileage}
                        error={!/^\d+$/.test(editBikeFormState.mileageFieldValue.trim())
                            && editBikeFormState.mileageFieldValue!==""}
                        helperText={(!/^\d+$/.test(editBikeFormState.mileageFieldValue.trim())
                            && editBikeFormState.mileageFieldValue!=="")
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
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>
                        Installed Components
                    </Typography>
                    <EditComponents components={editBikeFormState.components}
                                    handleSetComponents={handleSetInstalledComponents}/>
                </Box>
                <Box>
                    {editBikeFormState.services.length>0 &&
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>
                                Recorded Services
                            </Typography>
                            {editBikeFormState.services.map(service =>
                                <ServiceCard key={uuidv4()} service={service} deleteService={deleteService}/>)}
                        </Box>
                    }
                    <AddService handleSetServices={handleSetServices}
                                services={editBikeFormState.services}
                                components={editBikeFormState.components}
                                handleSetInstalledComponents={handleSetInstalledComponents}
                                editMode={props.editMode}/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    mt: 1
                }}>
                    <Button variant={"contained"} onClick={handleSubmitBike}
                        disabled =
                            {editBikeFormState.modelName===""
                            || editBikeFormState.mileage===undefined
                            || !/^\d+$/.test(editBikeFormState.mileageFieldValue.trim())}>
                        {props.editMode? "Save Changes" : "Save"}
                    </Button>
                    <Button variant={"contained"} onClick={handleCancel}>Cancel</Button>
                </Box>
            </Box>
        </>
    )
}
