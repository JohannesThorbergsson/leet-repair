import {useParams} from "react-router-dom";
import {Bike} from "../../model/Bike";
import ResponsiveAppBar from "../../ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React from "react";

type Props = {
    bikes: Bike[]
}
export default function BikeDetailPage(props: Props) {
    useAuth(true)
    const { bikeId } = useParams<{ bikeId: string }>()
    // const bike: Bike | undefined = props.bikes.find((bike) => bike.id === bikeId);
    return (
        <>
            <ResponsiveAppBar/>
            {/*{bike ? bike.modelName : "N"}*/}
            <Box sx={{
                    border: 2,
                    borderRadius: 1,
                    borderColor: 'primary.main',
                    m: 1,
                    p: 2
                }}>
                <Box sx={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <Typography variant={"h6"} sx={{m: 1}}>MegaBike9000</Typography>
                    <Typography variant={"h6"} sx={{m: 1}}>1337 km</Typography>
                </Box>
                <Box sx={{
                    justifyContent: 'start',
                    display: 'flex',
                    flexDirection: 'column',}}>
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Installed Components</Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Component</TableCell>
                                    <TableCell align="left">Model</TableCell>
                                    <TableCell align="right">Age (km)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*{bike.components.map((component) => (*/}
                                {/*    <TableRow*/}
                                {/*        key={component.category}*/}
                                {/*        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                                {/*    >*/}
                                {/*        <TableCell component="th" scope="row">*/}
                                {/*            {component.category}*/}
                                {/*        </TableCell>*/}
                                {/*        <TableCell align="left">{component.type}</TableCell>*/}
                                {/*        <TableCell align="right">{component.age}</TableCell>*/}
                                {/*    </TableRow>*/}
                                {/*))}*/}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}