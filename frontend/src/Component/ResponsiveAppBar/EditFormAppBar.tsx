import {Button, Container, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from "@mui/material/AppBar";
import React from "react";
import {EditBikeFormState} from "../../Reducer/editBikeFormReducer";

type EditFormAppBarProps = {
    title: string
    handleCancel(): void
    editMode: boolean
    handleSubmitBike(): void
    editBikeFormState: EditBikeFormState
}
export default function EditFormAppBar(props: EditFormAppBarProps){
    return (
        <AppBar position="sticky">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Tooltip title="Cancel">
                        <IconButton
                                    onClick={props.handleCancel}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ p: 0, ml: 0.5}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Tooltip>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2, ml: 1,
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'fantasy',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2, ml: 1,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {props.title}
                    </Typography>
                        <Button onClick={props.handleSubmitBike}
                                color="inherit" sx={{fontSize: 15}}
                                disabled = {props.editBikeFormState.modelName===""
                                || (!/^\d+$/.test(props.editBikeFormState.mileageFieldValue.trim())
                                    && props.editBikeFormState.mileageFieldValue!=="")}>
                            {props.editMode? "Save Changes" : "Save"}
                        </Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}