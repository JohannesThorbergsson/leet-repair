import {Component} from "./Component";
import {Coordinates} from "./Coordinates";

export type Workshop = {
    id: string
    name: string
    location: string
    coordinates: Coordinates
    services: [string]
    inventory: [Component]
}
