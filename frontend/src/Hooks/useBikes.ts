import {useEffect, useState} from "react";
import {Bike} from "../model/Bike";
import axios from "axios";

export default function useBikes(){
    const [bikes, setBikes] = useState<Bike[]>([])

    useEffect(fetchBikes, [])

    function fetchBikes(){
        axios.get("api/bikes/")
            .then(r => setBikes(r.data))
    }
    return {bikes}
}
