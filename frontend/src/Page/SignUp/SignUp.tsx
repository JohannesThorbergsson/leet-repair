import React from "react";
import {Link as RouterLink} from "react-router-dom";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import {Box, Button, Container, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import useSignUp from "../../Hooks/useSignUp";

export default function Login() {
    const {
        username,
        password,
        passwordConfirm,
        role,
        handleUsernameChange,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleRoleChange,
        handleSubmit
    } = useSignUp()

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
                    <TextField required
                               label="Username"
                               value={username}
                               fullWidth
                               margin ="normal" onChange={handleUsernameChange} />
                    <TextField required
                               label="Password"
                               type= {"password"}
                               value={password}
                               margin ="normal" fullWidth onChange={handlePasswordChange} />
                    <TextField required
                               label="Confirm Password" type= {"password"} value={passwordConfirm}
                               margin ="normal" fullWidth onChange={handlePasswordConfirmChange} />
                    <FormControl sx={{mt: 1}}>
                        <FormLabel id="user-role">How will you be using this App?</FormLabel>
                        <RadioGroup
                            sx={{ml: 3}}
                            onChange={handleRoleChange}
                            row
                            aria-labelledby="user-role"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="BASIC" control={<Radio />} label="Bike Owner" />
                            <FormControlLabel value="WORKSHOP" control={<Radio />} label="Workshop Owner" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        disabled={username.trim()==="" || password.trim()==="" || password.trim()==="" || role===undefined}
                        variant="contained" type={"submit"} sx={{
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
