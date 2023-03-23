import {Component} from "./Component";

export type ServiceEvent = {
    description: string
    newComponents: Component[]
    workshopName: string
    date: string
}