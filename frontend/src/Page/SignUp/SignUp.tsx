import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from 'axios'
import {Link as RouterLink, useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, Container, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [role, setRole] = useState<string>()
    const navigate = useNavigate()

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }
    function handlePasswordConfirmChange(event: ChangeEvent<HTMLInputElement>){
        setPasswordConfirm(event.target.value)
    }
    function handleRoleChange(event: ChangeEvent<HTMLInputElement>){
        setRole(event.target.value)
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
                    <TextField required id="outlined-required"
                               placeholder="Username"
                               value={username}
                               fullWidth
                               margin ="normal" onChange={handleUsernameChange} />
                    <TextField required
                               placeholder="Password"
                               type= {"password"} value={password}
                               margin ="normal" fullWidth onChange={handlePasswordChange} />
                    <TextField placeholder="Confirm Password" type= {"password"} value={password}
                               margin ="normal" fullWidth onChange={handlePasswordConfirmChange} />
                    <FormControl sx={{mt: 1}}>
                        <FormLabel id="demo-row-radio-buttons-group-label">How will you be using this App?</FormLabel>
                        <RadioGroup
                            sx={{ml: 3}}
                            onChange={handleRoleChange}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="BASIC" control={<Radio />} label="Bike Owner" />
                            <FormControlLabel value="WORKSHOP" control={<Radio />} label="Workshop Owner" />
                        </RadioGroup>
                    </FormControl>
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
