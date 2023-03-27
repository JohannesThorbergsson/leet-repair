import {Box, Button, TextField} from "@mui/material";
import React from "react";
import {Component} from "../../model/Component";
import useEditComponents from "../../Hooks/useEditComponents";
import ComponentTable from "../ComponentTable/ComponentTable";

type EditComponentsProp = {
    components: Component[]
    handleSetComponents(components: Component[]): void
}

export default function EditComponents(props: EditComponentsProp) {
    const {
        handleInputComponentAge,
        handleInputComponentCategory,
        handleInputComponentModel,
        handleDeleteComponent,
        handleSubmitNewComponent,
        newComponentModel,
        newComponentCategory,
        newComponentAge,
        newComponentAgeValue
    } = useEditComponents(props)
    return (
        <>
            <Box sx={{
                justifyContent: 'start',
                display: 'flex',
                flexDirection: 'column',}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <ComponentTable components={props.components} handleDeleteComponent={handleDeleteComponent}/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 1}}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Component"
                            fullWidth
                            error = {props.components.filter(c => c.category === newComponentCategory).length!==0}
                            helperText={props.components.filter(c => c.category === newComponentCategory).length!==0
                                && "Must be unique"}
                            value={newComponentCategory}
                            sx={{mt: 1, mr: 1}}
                            onChange={handleInputComponentCategory}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Model"
                            fullWidth
                            value={newComponentModel}
                            sx={{mt: 1, mr: 1}}
                            onChange={handleInputComponentModel}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Age (km)"
                            value={Number.isNaN(newComponentAge)? 0 : newComponentAge}
                            error={!/^\d+$/.test(newComponentAgeValue.trim()) && newComponentAgeValue!==""}
                            helperText={(!/^\d+$/.test(newComponentAgeValue.trim()) && newComponentAgeValue!=="") && "NaN"}
                            sx={{mt: 1}}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={handleInputComponentAge}
                        />
                    </Box>
                    <Button variant={"contained"} onClick={handleSubmitNewComponent} sx={{mt: 1}}
                            disabled={props.components.filter(c => c.category === newComponentCategory).length!==0
                                || newComponentModel===""
                                || newComponentCategory===""}>
                        Add Component
                    </Button>
                </Box>
            </Box>
        </>
    )
}