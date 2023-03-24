import {ChangeEvent, useState} from "react";
import {Component} from "../model/Component";

type useEditComponentsProps =  {
    components: Component[]
    handleSetComponents(components: Component[]): void

}
export default function useEditComponents(props: useEditComponentsProps){
    const[newComponentCategory, setNewComponentCategory] =useState<string>("")
    const[newComponentModel, setNewComponentModel] =useState<string>("")
    const[newComponentAge, setNewComponentAge] =useState<number>(0)
    const[newComponentAgeValue, setNewComponentAgeValue] =useState("")
    function handleInputComponentCategory(event: ChangeEvent<HTMLInputElement>){
        setNewComponentCategory(event.target.value)
    }
    function handleInputComponentModel(event: ChangeEvent<HTMLInputElement>) {
        setNewComponentModel(event.target.value)
    }
    function handleInputComponentAge(event: ChangeEvent<HTMLInputElement>){
        setNewComponentAgeValue(event.target.value)
        if(/^\d+$/.test(event.target.value)) {
            setNewComponentAge(Number(event.target.value))
        }
    }
    function handleSubmitNewComponent(){
        props.handleSetComponents([...props.components,
            {category: newComponentCategory, type: newComponentModel, age: newComponentAge}])
        setNewComponentAge(0)
        setNewComponentModel("")
        setNewComponentCategory("")
    }
    function handleDeleteComponent(component: Component) {
        props.handleSetComponents(props.components.filter((c => c.type !== component.type)))
    }
    return {
        handleInputComponentAge,
        handleInputComponentModel,
        handleInputComponentCategory,
        handleSubmitNewComponent,
        handleDeleteComponent,
        newComponentAge,
        newComponentAgeValue,
        newComponentCategory,
        newComponentModel
    }
}