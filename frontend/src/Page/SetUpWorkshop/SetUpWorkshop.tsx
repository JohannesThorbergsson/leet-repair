import ResponsiveAppBar from "../../Component/ResponsiveAppBar/ResponsiveAppBar";
import EditWorkshopForm from "../../Component/EditWorkshopForm/EditWorkshopForm";
import React from "react";
import useEditWorkshop from "../../Hooks/useEditWorkshop";
import useAuth from "../../Hooks/useAuth";

export default function SetUpWorkshop(){
    const user = useAuth(false)
    const {
        components,
        services,
        workshopName,
        addComponentDialogOpen,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleWorkshopNameChange,
        handleSetComponents} = useEditWorkshop({username: user?.username || ""})
    return (
        <>
            <ResponsiveAppBar/>
            <EditWorkshopForm username={user?.username || ""}
                              components={components}
                              handleSetComponents={handleSetComponents}
                              handleSetOpenAddComponentsDialog={handleSetOpenAddComponentsDialog}
                              addComponentDialogOpen={addComponentDialogOpen}
                              handleServicesChange={handleServicesChange}
                              handleWorkshopNameChange={handleWorkshopNameChange}/>
        </>
    )
}