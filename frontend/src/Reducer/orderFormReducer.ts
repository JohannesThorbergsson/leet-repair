import {Component} from "../model/Component";
import {Bike} from "../model/Bike";
import {Workshop} from "../model/Workshop";

type State = {
    orderedComponents: Component[]
    selectedBike: Bike | undefined
    orderDescription: string
    orderedComponentsText: string[] | undefined
    workshopNewOrder: Workshop | undefined
    workshopEditOrder: Workshop | undefined
    orderToEditStatus: string | undefined
    openDeleteDialog: boolean
}

type Action =
    | {type: "SET_ORDERED_COMPONENTS", payload: Component[]}
    | {type: "SET_SELECTED_BIKE", payload: Bike | undefined}
    | {type: "SET_ORDER_DESCRIPTION", payload: string}
    | {type: "SET_ORDERED_COMPONENTS_TEXT", payload: string[]}
    | {type: "SET_OPEN_DELETE_DIALOG", payload: boolean}

export default function orderFormReducer(state: State, action: Action){
    switch (action.type){
        case "SET_ORDERED_COMPONENTS":
            return {...state, orderedComponents: action.payload}
        case "SET_SELECTED_BIKE":
            return {...state, selectedBike: action.payload}
        case "SET_ORDER_DESCRIPTION":
            return {...state, orderDescription: action.payload}
        case "SET_ORDERED_COMPONENTS_TEXT":
            return {...state, orderedComponentsText: action.payload}
        case "SET_OPEN_DELETE_DIALOG":
            return {...state, openDeleteDialog: action.payload}
        default:
            return state
    }
}
