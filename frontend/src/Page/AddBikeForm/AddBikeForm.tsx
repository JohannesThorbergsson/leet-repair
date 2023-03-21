import {
    Box,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import React from "react";

export default function AddBikeForm() {

    return(
        <>
            <ResponsiveAppBar/>
            <Box sx={{
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Typography variant={"h4"} sx={{m: 1}}>New Bike</Typography>
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
                        label="Model Name"
                        fullWidth
                        sx={{mt: 1}}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Mileage"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">km</InputAdornment>,
                        }}
                        sx={{mt: 1}}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 1
                }}>
                    <Box sx={{
                        justifyContent: 'start',
                        display: 'flex',
                        flexDirection: 'row',}}>
                        <Typography variant={"subtitle1"} fontWeight={"medium"}>Installed Components</Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Component</TableCell>
                                        <TableCell align="left">Model</TableCell>
                                        <TableCell align="right">Age (km)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.bike.components.map((component) => (
                                        <TableRow
                                            key={component.type}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {component.category}
                                            </TableCell>
                                            <TableCell align="left">{component.type}</TableCell>
                                            <TableCell align="right">{component.ageKm}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    )
}