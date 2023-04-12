import {UpdateOrderStatusDialogProps} from "../Dialog/UpdateOrderStatusDialog";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Component} from "../model/Component";

export default function useUpdateOrderStatusDialog(props: UpdateOrderStatusDialogProps){
    const radioGroupRef = useRef<HTMLElement>(null)
    const [status, setStatus] = useState(props.status)
    const [description, setDescription] = useState<string>(props.description)
    const [components, setComponents] = useState(props.components)

    useEffect(() => {
        if (!props.open) {
            setStatus(props.status)
        }
    }, [props])

    const options = [
        'Open',
        'In Progress',
        'Ready for Pickup',
        props.user?.role === "BASIC"? 'Done': undefined,
    ].filter((option): option is string => typeof option === 'string')
    function handleEntering(){
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus()
        }
    }
    function handleOk(){
        props.handleUpdateStatusDialogSetOpen()
        props.handleSave()
        props.handleSetStatus(status)
        props.handleSetDescription(description)
        props.handleSetComponents(components)
    }

    function handleChangeStatus (event: ChangeEvent<HTMLInputElement>){
        setStatus((event.target as HTMLInputElement).value)
    }
    function handleInputDescription(event: ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value)
    }
    function handleSetComponents(components: Component[]){
        setComponents(components)
    }
    return {
        radioGroupRef,
        status,
        description,
        components,
        options,
        handleEntering,
        handleOk,
        handleChangeStatus,
        handleInputDescription,
        handleSetComponents
    }
}
