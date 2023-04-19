import {Button, Container, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from "@mui/material/AppBar";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

type EditFormAppBarProps = {
    title: string
    handleCancel(): void
    editMode: boolean
    handleSubmit(): void
    submitDisabled: boolean
    orderMode?: boolean
}
export default function FormAppBar(props: EditFormAppBarProps){
    const submitBikeButtonCaption = props.editMode? "Save Changes" : "Save"
    const submitOrderButtonCaption = props.editMode? "Submit Changes" : "Submit"
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <AppBar position="sticky">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Tooltip title="Cancel">
                        <IconButton
                                onClick={props.orderMode && !props.editMode ?
                                    ()=>navigate("/", {state: {searchTerm: location.state.searchTerm}}) :
                                    props.handleCancel}
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
                            mr: 0, ml: 1, p: 0,
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
                            mr: 0, ml: 1, p: 0,
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
                    <Button onClick={props.handleSubmit}
                            color="inherit" sx={{fontSize: 15, p: 0, mr: 0, maxWidth: 3/10}}
                            disabled = {props.submitDisabled}>
                        {props.orderMode? submitOrderButtonCaption : submitBikeButtonCaption}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
