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
    const [mapApiKey, setMapApiKey] = useState<string>("")
    const [isFetching, setIsFetching] = useState(false)

    const user = useAuth(false)
    const prevUser = useRef(user);
    useEffect(() => {
        if (user !== null && prevUser.current === null) {
            fetchData()
        }
        prevUser.current = user
        //eslint-disable-next-line
    }, [user])
    function updateBikeList(bikes: Bike[]){
        setBikes(bikes)
    }
    function updateOrderList(orders: ServiceOrder[]){
        setOrders(orders)
    }
    function updateWorkshopList(workshops: Workshop[]){
        setWorkshops(workshops)
    }
    async function fetchData() {
        setIsFetching(true)
        if(user?.role==="BASIC"){
            await axios.get("/api/orders/")
                .then(r => setOrders(r.data))
                .catch((error) => console.error(error))
        } else {
            await axios.get("/api/orders/"+ user?.id)
                .then(r => setOrders(r.data))
                .catch((error) => console.error(error))
        }
        await axios.get("/api/bikes/")
            .then(r => setBikes(r.data))
            .catch((error) => console.error(error))
        await axios.get("/api/workshops/")
            .then(r => setWorkshops(r.data))
            .catch((error) => console.error(error))
        await axios.get("/api/secrets/")
            .then(r=> setMapApiKey(r.data))
            .catch((error) => console.error(error))
        setIsFetching(false)
    }
    return {bikes, orders, workshops, isFetching, mapApiKey, updateBikeList, updateOrderList, updateWorkshopList}
}
