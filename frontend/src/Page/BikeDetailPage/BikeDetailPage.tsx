import {useNavigate, useParams} from "react-router-dom";
import {Bike} from "../../model/Bike";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import {v4 as uuidv4} from "uuid"

type Props = {
    bikes: Bike[]
}
export default function BikeDetailPage(props: Props) {
    useAuth(true)
    const navigate = useNavigate()
    const { bikeId } = useParams<{ bikeId: string }>()
    const bike: Bike | undefined = props.bikes.find((bike) => bike.id === bikeId);
    return (
        <>
            <ResponsiveAppBar/>
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
                    <Typography variant={"h5"} fontWeight={"medium"} sx={{m: 1}}>MegaBike9000</Typography>
                    <Typography variant={"h5"} fontWeight={"medium"} sx={{m: 1}}>1337 km</Typography>
                </Box>{/*NOSONAR*/}
                <Box sx={{
                    justifyContent: 'start',
                    display: 'flex',
                    flexDirection: 'column',}}> {/*NOSONAR*/}
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Installed Components</Typography> {/*NOSONAR*/}
                    <TableContainer component={Paper}> {/*NOSONAR*/}
                        <Table aria-label="simple table"> {/*NOSONAR*/}
                            <TableHead> {/*NOSONAR*/}
                                <TableRow> {/*NOSONAR*/}
                                    <TableCell>Component</TableCell> {/*NOSONAR*/}
                                    <TableCell align="left">Model</TableCell> {/*NOSONAR*/}
                                    <TableCell align="right">Age (km)</TableCell> {/*NOSONAR*/}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bike?.components.map((component) => (
                                    <TableRow
                                        key={component.category}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {component.category}
                                        </TableCell>
                                        <TableCell align="left">{component.type}</TableCell>
                                        <TableCell align="right">{component.age}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box> {/*NOSONAR*/}
                <Box>
                    <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Service history</Typography>
                    {bike?.services.map(service => <ServiceCard key={uuidv4()} service={service}/>)}
                </Box>
                <Box>
                    <Button variant={"contained"} onClick={() => navigate("/bikes")}>Back</Button>
                </Box>
            </Box>
        </>
    )
}