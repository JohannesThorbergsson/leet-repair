import {Autocomplete, Box, Button, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import React from "react";
import ComponentFormDialog from "../../Dialog/ComponentFormDialog";
import ComponentTable from "../ComponentTable/ComponentTable";
import useEditComponents from "../../Hooks/useEditComponents";
import useEditWorkshop from "../../Hooks/useEditWorkshop";
import {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";
import {Map, Marker} from "react-map-gl";
import IconButton from "@mui/material/IconButton";
import PlaceIcon from "@mui/icons-material/Place";
import FormAppBar from "../ResponsiveAppBar/FormAppBar";

type EditWorkshopFormProps = {
    user: User | null
    workshopToEdit?: Workshop
    mapApiKey: string
}
export default function EditWorkshopForm(props: EditWorkshopFormProps){
    const {
        navigate,
        workshopFormState,
        getCoordinates,
        handleSubmit,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleAddressChange,
        handleWorkshopNameChange,
        handleSetComponents}
        = useEditWorkshop(props)
    const {handleDeleteComponent}
        = useEditComponents({components: workshopFormState.components, handleSetComponents: handleSetComponents})

    return (
        <>
            {props.workshopToEdit &&
                <FormAppBar title={"Your Workshop"}
                            handleCancel={()=>navigate("/")}
                            editMode={true}
                            handleSubmit={handleSubmit}
                            submitDisabled={workshopFormState.workshopName==="" || workshopFormState.services.length<1}/>
            }
            <Box sx={{m: 2, mt: 1, p: 1}}>
                <TextField
                    required
                    label={"Workshop Name"}
                    fullWidth
                    margin={"normal"}
                    onChange={handleWorkshopNameChange}
                    value={workshopFormState.workshopName}
                />
                <TextField
                    required
                    label={"Address"}
                    fullWidth
                    error={workshopFormState.invalidAddress}
                    margin={"normal"}
                    onChange={handleAddressChange}
                    value={workshopFormState.address}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {workshopFormState.address !=="" && (
                                    <IconButton onClick={getCoordinates}>
                                        <PlaceIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                {workshopFormState.coordinates &&
                    <Map
                        id={"workshop-location"}
                        initialViewState={{
                            longitude: workshopFormState.coordinates.lng,
                            latitude: workshopFormState.coordinates.lat,
                            zoom: 12.5
                        }}
                        latitude={workshopFormState.coordinates.lat}
                        longitude={workshopFormState.coordinates.lng}
                        maxZoom={15.5}
                        style={{width: "100%", height: '200px'}}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        mapboxAccessToken={props.mapApiKey}
                    >
                        <Marker
                            key={workshopFormState.address}
                            longitude={workshopFormState.coordinates.lng}
                            latitude={workshopFormState.coordinates.lat}
                            anchor={"bottom"}
                        />
                    </Map>
                }
                <Autocomplete
                    sx={{mt: 2, width: 1}}
                    multiple
                    freeSolo
                    autoSelect
                    aria-required={true}
                    options={[]}
                    value={workshopFormState.services}
                    onChange={handleServicesChange}
                    id="select-components"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Specify services you offer"
                            placeholder="Services"
                        />
                    )}
                />
                <Box sx={{mt: 2, p: 1}} component={Paper}>
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mb: 1}}>
                        Components on Offer
                    </Typography>
                    <ComponentTable components={workshopFormState.components}
                                    handleDeleteComponent={handleDeleteComponent}
                                    showAge={false}/>
                    <Button variant={"contained"} sx={{mt: 2}} onClick={()=>handleSetOpenAddComponentsDialog()}>
                        Add Item to Inventory
                    </Button>
                    <ComponentFormDialog components={workshopFormState.components}
                                         handleSetComponents={handleSetComponents}
                                         open={workshopFormState.addComponentDialogOpen}
                                         handleSetOpenAddComponentsDialog={handleSetOpenAddComponentsDialog}
                                         keepMounted
                                         title={"Add an Item to your Inventory"}/>
                </Box>
                {!props.workshopToEdit &&
                    <Button onClick={handleSubmit}
                            variant={"contained"}
                            sx={{mt:2, width: 1}}
                            disabled={workshopFormState.workshopName==="" || workshopFormState.services.length<1}>
                        Register your Workshop
                    </Button>
                }
            </Box>
        </>
    )
}
