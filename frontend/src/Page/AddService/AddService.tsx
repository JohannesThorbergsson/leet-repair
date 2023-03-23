import {Box, Button, TextField, Typography} from "@mui/material";
import React, {ChangeEvent} from "react";
import EditComponents from "../../Component/EditComponents/EditComponents";
import {useNavigate} from "react-router-dom";
import {Component} from "../../model/Component";

type AddServiceProps = {
    handleInputDescription(event: ChangeEvent<HTMLInputElement>): void
    handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>): void
    handleInputDate(event: ChangeEvent<HTMLInputElement>): void
    handleSetComponents(components: Component[]): void
    components: Component[]
}
export default function AddService(props: AddServiceProps) {
    const navigate = useNavigate()

    return(
        <>
            <Box sx = {{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                p: 1,
                mt: 2
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}>
                    <Typography variant={"h6"} sx={{m: 1}}>Document a service</Typography>
                </Box>
                <Box sx={{

                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Description"
                            fullWidth
                            onChange={props.handleInputDescription}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Workshop name"
                            fullWidth
                            onChange={props.handleInputWorkshopName}
                            sx={{mt: 1}}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Date"
                            onChange={props.handleInputDate}
                            sx={{mt: 1}}
                        />
                        <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Replaced Components</Typography>
                        <EditComponents handleSetComponents={props.handleSetComponents} components={props.components}/>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            mt: 1
                        }}>
                            <Button variant={"contained"}
                                    disabled
                            >Save</Button>
                            <Button variant={"contained"} onClick={()=> navigate("/bikes/edit-form")}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
