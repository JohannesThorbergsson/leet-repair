import {useEffect, useRef, useState} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";
import useAuth from "./useAuth";
import {ServiceOrder} from "../model/ServiceOrder";
import {Workshop} from "../model/Workshop";

export default function useFetchData(){
    const [bikes, setBikes] = useState<Bike[]>([])
    const [orders, setOrders] = useState<ServiceOrder[]>([])
    const [workshops, setWorkshops] = useState<Workshop[]>([])

    const user = useAuth(false)
    const prevUser = useRef(user);
    useEffect(() => {
        if (user !== null && prevUser.current === null) {
            fetchData()
        }
        prevUser.current = user
    }, [user])
    function updateBikeList(bikes: Bike[]){
        setBikes(bikes)
    }
    function updateOrderList(orders: ServiceOrder[]){
        setOrders(orders)
    }
    function fetchData(){
        axios.get("/api/bikes/")
            .then(r => setBikes(r.data))
            .catch((error) => console.error(error))
        axios.get("api/orders/")
            .then(r => setOrders(r.data))
            .catch((error) => console.error(error))
        axios.get("/api/workshops/")
            .then(r => setWorkshops(r.data))
    }
    return {bikes, orders, workshops, updateBikeList, updateOrderList}
}
