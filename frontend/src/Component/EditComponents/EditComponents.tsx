import {Box, Button, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent} from "react";
import {Component} from "../../model/Component";

type EditComponentsProp = {
    components: Component[]
    handleDeleteComponent(component: Component): void
    handleSubmitNewComponent(event: FormEvent<HTMLFormElement>): void
    handleInputComponentCategory(event: ChangeEvent<HTMLInputElement>): void
    handleInputComponentModel(event: ChangeEvent<HTMLInputElement>): void
    handleInputComponentAge(event: ChangeEvent<HTMLInputElement>): void
    newComponentCategory: string
    newComponentModel: string
    newComponentAge: number | undefined
    newComponentAgeValue: string

}

export default function EditComponents(props: EditComponentsProp) {
    return (
        <>
            <Box sx={{
                justifyContent: 'start',
                display: 'flex',
                flexDirection: 'column',}}>
                <Box component={"form"} onSubmit={props.handleSubmitNewComponent} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mt: 1}}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Component"
                            fullWidth
                            error = {props.components.filter(c => c.category === props.newComponentCategory).length!==0}
                            helperText={props.components.filter(c => c.category === props.newComponentCategory).length!==0
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
                            sx={{mt: 1, mr: 1}}
                            onChange={props.handleInputComponentModel}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Age (km)"
                            value={props.newComponentAge}
                            error={!/^\d+$/.test(props.newComponentAgeValue.trim()) && props.newComponentAgeValue!==""}
                            sx={{mt: 1}}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            onChange={props.handleInputComponentAge}
                        />
                    </Box>
                    <Button variant={"contained"} type={"submit"} sx={{mt: 1}}
                            disabled={props.components.filter(c => c.category === props.newComponentCategory).length!==0}
                    >Add Component</Button>
                </Box>
            </Box>
        </>
    )
}