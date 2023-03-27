import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {Link as RouterLink, useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios
            .post("/api/users/", {username, password})
            .then(() => navigate("/login"))
            .catch(error => console.log(error))
    }
    return (
        <>
            <ResponsiveAppBar/>
            <Container>
                <Box component={"form"} onSubmit={handleSubmit}
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         margin: 2,
                         '&:hover': {
                             backgroundColor: '',
                             opacity: [0.9, 0.8, 0.7],
                         },
                     }}
                >
                    <Typography variant="h2" component="h5" fontWeight={"regular"}>
                        Sign up
                    </Typography>
                    <TextField placeholder="Username" value={username} fullWidth
                               margin ="normal" onChange={handleUsernameChange} />
                    <TextField placeholder="Password" type= {"password"} value={password}
                               margin ="normal" fullWidth onChange={handlePasswordChange} />
                    <Button variant="contained" type={"submit"} sx={{
                        m: 1
                    }}>Sign up</Button>
                </Box>
                    <Link component={RouterLink} to={"/login"} sx ={{
                        margin: 2
                    }}>To Login</Link>
            </Container>
        </>
    )
}