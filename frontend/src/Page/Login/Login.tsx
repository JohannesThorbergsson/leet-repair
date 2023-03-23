import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";

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
        const authorization = window.btoa(`${username}:${password}`)
        axios
            .post("/api/users/login", {},
            {headers: {Authorization: `Basic ${authorization}`}})
            .then(() => {
                navigate(window.sessionStorage.getItem('signInRedirect') || '/')
            })
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
                        Log in
                    </Typography>
                    <TextField placeholder="Username" value={username} fullWidth
                               margin ="normal" onChange={handleUsernameChange} />
                    <TextField placeholder="Password" type= {"password"} value={password}
                               margin ="normal" fullWidth onChange={handlePasswordChange} />
                    <Button variant="contained" type={"submit"} sx={{
                        m: 1
                    }}>Log in</Button>
                </Box>
                <p>No account?
                    <Link component={RouterLink} to={"/signup"} sx ={{
                        margin: 2
                    }}>Sign up here</Link>
                </p>
            </Container>
        </>
    )
}
