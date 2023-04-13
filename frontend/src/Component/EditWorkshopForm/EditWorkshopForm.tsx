import {Autocomplete, Box, Button, Paper, TextField, Typography} from "@mui/material";
import React from "react";
import ComponentFormDialog from "../../Dialog/ComponentFormDialog";
import ComponentTable from "../ComponentTable/ComponentTable";
import useEditComponents from "../../Hooks/useEditComponents";
import useEditWorkshop from "../../Hooks/useEditWorkshop";
import {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";

type EditWorkshopFormProps = {
    user: User | null
    workshops: Workshop[]
    workshopToEdit?: Workshop
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
            <Box sx={{mt: 1, mb: 1}} component="form" onSubmit={handleSubmit}>
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
                />
                {/*<Map*/}
                {/*    id={"workshop-location"}*/}
                {/*    initialViewState={{*/}
                {/*        longitude: 49.40564,*/}
                {/*        latitude: 8.54353,*/}
                {/*        zoom: 12.5*/}
                {/*    }}*/}
                {/*    maxZoom={15.5}*/}
                {/*    style={{width: "100%", height: '200px'}}*/}
                {/*    mapStyle="mapbox://styles/mapbox/streets-v12"*/}
                {/*    mapboxAccessToken={process.env.REACT_APP_MAP_KEY}*/}
                {/*>*/}
                {/*    <Marker*/}
                {/*        key={address}*/}
                {/*        longitude={49.40564}*/}
                {/*        latitude={8.54353}*/}
                {/*        anchor={"bottom"}*/}
                {/*    />*/}
                {/*</Map>*/}
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
                <Button type="submit"
                        variant={"contained"}
                        sx={{mt:2, width: 1}}
                        disabled={workshopName==="" || services.length<1}>
                    {!props.workshopToEdit? "Register your Workshop": "Update Profile"}
                </Button>
                {props.workshopToEdit &&
                    <Button variant={"contained"} sx={{mt: 1, width: 1}} onClick={()=>navigate("/")}>
                        Cancel
                    </Button>

                }
            </Box>
        </>
    )
}
