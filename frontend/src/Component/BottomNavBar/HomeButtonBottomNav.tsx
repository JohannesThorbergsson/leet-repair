import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from "react";
import {useNavigate} from "react-router-dom";

export default function HomeButtonBottomNav(){
    const navigate = useNavigate()
    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: 70}} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction onClick={()=>navigate("/")}
                                            label="Dashboard"
                                            icon={<DashboardIcon fontSize={"large"}/>}/>
                </BottomNavigation>
        </Paper>
    )
}