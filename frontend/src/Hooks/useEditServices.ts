import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";
import {v4 as uuidv4} from "uuid";
import {ServiceFormDialogProps} from "../Dialog/ServiceFormDialog";

export default function useEditServices(props: ServiceFormDialogProps) {
    const[description, setDescription] =useState<string>("")
    const[workshopName, setWorkshopName] = useState<string>("")
    const[date, setDate] = useState<string>("")
    const[newBikeComponents, setNewBikeComponents] = useState<Component[]>([])

    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleInputWorkshopName(event: ChangeEvent<HTMLInputElement>){
        setWorkshopName(event.target.value)
    }
    function handleInputDate(event: ChangeEvent<HTMLInputElement>){
        setDate(event.target.value)
    }
    function handleSetNewComponents(components: Component[]){
        setNewBikeComponents(components)
    }
    function clearInputFields(){
        setDate("")
        setDescription("")
        setWorkshopName("")
        setNewBikeComponents([])
    }
    function handleSubmitService(){
        if(props.scrollToBottom){
            props.scrollToBottom()
        }
        props.handleSetServices([...props.editBikeFormState.services,
            {
                description: description,
                newComponents: newBikeComponents,
                workshopName:workshopName,
                date: date,
                id: uuidv4()}])
        if (props.editMode) {
            const newComponentCategories = new Set(newBikeComponents
                .map(component => component.category.trim().toLowerCase()))

            props.handleSetInstalledComponents([...props.editBikeFormState.components.filter(
                oldComponents => !newComponentCategories.has(oldComponents.category.trim().toLowerCase())),
                ...newBikeComponents])
        }
        clearInputFields()
        props.handleOpenServiceFormDialog()
    }

    return {
        handleInputDate,
        handleInputDescription,
        handleInputWorkshopName,
        clearInputFields,
        handleSetNewComponents,
        handleSubmitService,
        description,
        workshopName,
        date,
        newBikeComponents
    }
}
