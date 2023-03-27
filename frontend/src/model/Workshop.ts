import {Component} from "./Component";

export type Workshop = {
    id: string
    name: string
    services: [string]
    inventory: [Component]
}
