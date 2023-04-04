import {Box, Button} from "@mui/material";
import React from "react";
import {Component} from "../../model/Component";
import useEditComponents from "../../Hooks/useEditComponents";
import ComponentTable from "../ComponentTable/ComponentTable";
import AddComponentInput from "../AddComponentInput/AddComponentInput";

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
                    <AddComponentInput components={props.components}
                                       newComponentCategory={newComponentCategory}
                                       handleInputComponentCategory={handleInputComponentCategory}
                                       newComponentModel={newComponentModel}
                                       handleInputComponentModel={handleInputComponentModel}
                                       newComponentAge={newComponentAge}
                                       handleInputComponentAge={handleInputComponentAge}
                                       displayAge={props.displayAge}/>

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
