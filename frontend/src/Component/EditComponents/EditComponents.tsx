import {Box, Button, TextField} from "@mui/material";
import React from "react";
import {Component} from "../../model/Component";
import useEditComponents from "../../Hooks/useEditComponents";
import ComponentTable from "../ComponentTable/ComponentTable";

type EditComponentsProp = {
    components: Component[]
    handleSetComponents(components: Component[]): void
    displayAge?: boolean
    dialogMode?: boolean
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
        submitDisabled
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
                    {!props.dialogMode &&
                        <ComponentTable components={props.components}
                                        handleDeleteComponent={handleDeleteComponent}
                                        showAge={props.displayAge ?? false}/>
                    }
                    <Box sx={{
                        display: 'flex',
                        flexDirection: props.dialogMode? 'column' : 'row',
                        mt: 1}}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Component"
                            fullWidth
                            error = {props.components.filter(c => c.category === newComponentCategory.trim()).length!==0}
                            helperText={props.components.filter(c => c.category === newComponentCategory.trim()).length!==0
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
                            sx={{mt: 1, mr: (props.displayAge ? 1:0)}}
                            onChange={handleInputComponentModel}
                        />
                        {props.displayAge &&
                            <TextField
                                required
                                id="outlined-required"
                                label="Age (km)"
                                value={Number.isNaN(newComponentAge)? "" : newComponentAge}
                                error={Number.isNaN(newComponentAge)}
                                helperText={Number.isNaN(newComponentAge) && "NaN"}
                                sx={{mt: 1}}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                onChange={handleInputComponentAge}
                            />
                        }
                    </Box>
                    {!props.dialogMode &&
                        <Button variant={"contained"}
                                onClick={handleSubmitNewComponent}
                                sx={{mt: 1}}
                                disabled={submitDisabled}>
                            Add Component
                        </Button>
                    }
                </Box>
            </Box>
        </>
    )
}
