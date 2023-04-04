import {Box, TextField} from "@mui/material";
import React, {ChangeEvent} from "react";
import {Component} from "../../model/Component";

type AddComponentInputProps = {
    components: Component[]
    newComponentCategory: string
    handleInputComponentCategory(event: ChangeEvent<HTMLInputElement>): void
    newComponentModel: string
    handleInputComponentModel(event: ChangeEvent<HTMLInputElement>): void
    newComponentAge: number
    handleInputComponentAge(event: ChangeEvent<HTMLInputElement>): void
    dialogMode?: boolean
    displayAge?: boolean
}
export default function AddComponentInput(props: AddComponentInputProps){
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: props.dialogMode? 'column' : 'row',
            mt: 1}}>
            <TextField
                required
                id="outlined-required"
                label="Component"
                fullWidth
                error = {props.components.filter(c =>
                    c.category === props.newComponentCategory.trim()).length!==0}
                helperText={props.components.filter(c =>
                    c.category === props.newComponentCategory.trim()).length!==0
                    && "Must be unique"}
                value={props.newComponentCategory}
                sx={{mt: 1, mr: 1}}
                onChange={props.handleInputComponentCategory}
            />
            <TextField
                required
                id="outlined-required"
                label="Model"
                fullWidth
                value={props.newComponentModel}
                sx={{mt: 1, mr: (props.displayAge ? 1:0)}}
                onChange={props.handleInputComponentModel}
            />
            {props.displayAge &&
                <TextField
                    required
                    id="outlined-required"
                    label="Age (km)"
                    value={Number.isNaN(props.newComponentAge)? "" : props.newComponentAge}
                    error={Number.isNaN(props.newComponentAge)}
                    helperText={Number.isNaN(props.newComponentAge) && "NaN"}
                    sx={{mt: 1}}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={props.handleInputComponentAge}
                />
            }
        </Box>
    )
}
