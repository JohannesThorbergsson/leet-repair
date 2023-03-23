import {Box, InputAdornment, TextField, Typography} from "@mui/material";
import React from "react";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";

export default function AddService() {
    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                    <Typography variant={"h4"} sx={{m: 1}}>Document a service</Typography>
                </Box>
            <Box sx={{
                border: 2,
                borderRadius: 1,
                borderColor: 'primary.main',
                m: 1,
                p: 2
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
                        // onChange={handleInputModelName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Workshop name"
                        fullWidth
                        // onChange={handleInputModelName}
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Date"
                        // error={!/^\d+$/.test(mileageFieldValue.trim()) && mileageFieldValue!==""}
                        // helperText={(!/^\d+$/.test(mileageFieldValue.trim()) && mileageFieldValue!=="")
                        //     && "Must be a numeric value"}
                        // onChange={handleInputMileage}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                        }}
                        sx={{mt: 1}}
                    />

                </Box>
            </Box>
        </>
    )
}