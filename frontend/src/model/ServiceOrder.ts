import {Component} from "./Component";

export type ServiceOrder = {
    id: string
    bikeId: string
    description: string
    workshop: string
    status: string
    date: string
    componentsToReplace: Component[]
}
