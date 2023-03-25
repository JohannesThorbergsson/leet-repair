import {useNavigate, useParams} from "react-router-dom";
import {Bike} from "../../model/Bike";
import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import useAuth from "../../Hooks/useAuth";
import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import React from "react";
import ServiceCard from "../../Component/ServiceCard/ServiceCard";
import {v4 as uuidv4} from "uuid"
import TableHeadComponentTable from "../../Component/TableHeadComponentTable/TableHeadComponentTable";

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
            {bike?
                <Box sx={{
                    border: 2,
                    borderRadius: 1,
                    borderColor: 'primary.main',
                    m: 1,
                    p: 2}}>
                    <Box sx={{
                        display:'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        }}>
                        <Typography variant={"h5"} fontWeight={"medium"} sx={{m: 1}}>{bike?.modelName}</Typography>
                        <Typography variant={"h5"} fontWeight={"medium"} sx={{m: 1}}>{bike?.mileage}</Typography>
                    </Box>
                    <Box sx={{
                        justifyContent: 'start',
                        display: 'flex',
                        flexDirection: 'column',}}>
                        <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>
                            Installed Components
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHeadComponentTable cells={[{cellName:"Component", align: undefined},
                                    {cellName:"Model", align:"left"}, {cellName:"Age (km)", align:"right"}]}/>
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
                    </Box>
                    <Box>
                        <Typography variant={"subtitle1"} fontWeight={"medium"} sx={{mt: 1}}>Service history</Typography>
                        {(bike?.services.length === undefined || bike?.services.length<1)?
                            <Typography variant={"h6"}>No services recorded</Typography>:
                        bike.services.map(service =>
                            <ServiceCard key={uuidv4()} service={service} />)}
                    </Box>
                    <Box>
                        <Button variant={"contained"} onClick={() => navigate("/bikes")}>Back</Button>
                    </Box>
                </Box>:
                <Typography variant="h4" component="h4" fontWeight={"bold"} sx={{mt: 3}}>Invalid id</Typography>
            }
        </>
    )
}
