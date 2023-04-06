import {Component} from "./Component";

export type ServiceOrder = {
    id: string
    bikeId: string
    bikeName: string
    description: string
    workshop: string
    workshopId: string
    status: string
    date: string
    componentsToReplace: Component[]
}
