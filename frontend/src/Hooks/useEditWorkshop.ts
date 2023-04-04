import {ChangeEvent, SyntheticEvent, useState} from "react";
import {Component} from "../model/Component";

type UseEditWorkshopProps = {
    username: string
}
export default function useEditWorkshop(props: UseEditWorkshopProps){
    const [components, setComponents] = useState<Component[]>([])
    const [addComponentDialogOpen, setAddComponentDialogOpen] = useState(false)
    const [services, setServices] = useState<string[]>([])
    const [workshopName, setWorkshopName] = useState(props.username || "")

    function handleServicesChange(event: SyntheticEvent, value: string[]) {
        setServices(value)
    }
    function handleWorkshopNameChange(event: ChangeEvent<HTMLInputElement>) {
        setWorkshopName(event.target.value)
    }
    function handleSetComponents(components: Component[]){
        setComponents(components)
    }
    function handleSetOpenAddComponentsDialog(){
        setAddComponentDialogOpen(!addComponentDialogOpen)
    }
    return {
        components,
        services,
        workshopName,
        addComponentDialogOpen,
        handleSetOpenAddComponentsDialog,
        handleServicesChange,
        handleWorkshopNameChange,
        handleSetComponents}
}