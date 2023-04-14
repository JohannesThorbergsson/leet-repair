import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ArchiveIcon from '@mui/icons-material/Archive';
import ConstructionIcon from '@mui/icons-material/Construction';
import React from "react";
import {User} from "../../Hooks/useAuth";
import {Workshop} from "../../model/Workshop";

type BottomBarProps = {
    user: User | null
    workshop?: Workshop
    isSearch?: boolean
    closeSearch? (): void
}
export default function DashboardBottomNav(props: BottomBarProps){
    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: 80}} elevation={3}>
            {!props.isSearch ?
                <BottomNavigation showLabels>
                    <BottomNavigationAction href={"/orders/archive"}
                                            label="Archived Orders"
                                            icon={<ArchiveIcon fontSize={"large"}/>}/>
                    {props.user?.role === "BASIC" ?
                        <BottomNavigationAction href={"/bikes"}
                                                label="Manage Bikes"
                                                icon={<DirectionsBikeIcon fontSize={"large"}/>}/>:
                        <BottomNavigationAction href={"/workshops/edit/" + props.workshop?.id}
                                                label="Manage Workshop"
                                                icon={<ConstructionIcon fontSize={"large"}/>}/>
                    }
                </BottomNavigation>:
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Close Search"
                                            onClick={props.closeSearch}
                                            icon={<ClearIcon fontSize={"large"}/>}/>
                </BottomNavigation>
            }
        </Paper>
    )
}
