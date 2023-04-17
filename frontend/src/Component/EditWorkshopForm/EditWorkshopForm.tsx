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
    workshops: Workshop[]
    workshopToEdit?: Workshop
    mapApiKey: string
    updateWorkshopList(workshops: Workshop[]): void
}
export default function EditWorkshopForm(props: EditWorkshopFormProps){
    const {
        navigate,
        components,
        services,
        address,
        coordinates,
        invalidAddress,
        workshopName,
        addComponentDialogOpen,
        getCoordinates,
        handleSubmit,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleAddressChange,
        handleWorkshopNameChange,
        handleSetComponents}
        = useEditWorkshop(props)
    const {handleDeleteComponent}
        = useEditComponents({components: components, handleSetComponents: handleSetComponents})

    return (
        <>
            {props.workshopToEdit &&
                <FormAppBar title={"Your Workshop"}
                            handleCancel={()=>navigate("/")}
                            editMode={true}
                            handleSubmit={handleSubmit}
                            submitDisabled={workshopName==="" || services.length<1}/>
            }
            <Box sx={{m: 2, mt: 1, p: 1}}>
                <TextField
                    required
                    label={"Workshop Name"}
                    fullWidth
                    margin={"normal"}
                    onChange={handleWorkshopNameChange}
                    value={workshopName}
                />
                <TextField
                    required
                    label={"Address"}
                    fullWidth
                    error={invalidAddress}
                    margin={"normal"}
                    onChange={handleAddressChange}
                    value={address}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {address !=="" && (
                                    <IconButton onClick={getCoordinates}>
                                        <PlaceIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
                {coordinates &&
                    <Map
                        id={"workshop-location"}
                        initialViewState={{
                            longitude: coordinates.lng,
                            latitude: coordinates.lat,
                            zoom: 12.5
                        }}
                        latitude={coordinates.lat}
                        longitude={coordinates.lng}
                        maxZoom={15.5}
                        style={{width: "100%", height: '200px'}}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        mapboxAccessToken={props.mapApiKey}
                    >
                        <Marker
                            key={address}
                            longitude={coordinates.lng}
                            latitude={coordinates.lat}
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
                    value={services}
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
                    <ComponentTable components={components}
                                    handleDeleteComponent={handleDeleteComponent}
                                    showAge={false}/>
                    <Button variant={"contained"} sx={{mt: 2}} onClick={()=>handleSetOpenAddComponentsDialog()}>
                        Add Item to Inventory
                    </Button>
                    <ComponentFormDialog components={components}
                                         handleSetComponents={handleSetComponents}
                                         open={addComponentDialogOpen}
                                         handleSetOpenAddComponentsDialog={handleSetOpenAddComponentsDialog}
                                         keepMounted />
                </Box>
                {!props.workshopToEdit &&
                    <Button onClick={handleSubmit}
                            variant={"contained"}
                            sx={{mt:2, width: 1}}
                            disabled={workshopName==="" || services.length<1}>
                        Register your Workshop
                    </Button>
                }
            </Box>
        </>
    )
}
