import {ChangeEvent, useEffect, useState} from "react";
import {Workshop} from "../model/Workshop";
import axios from "axios";

export default function useWorkshops() {
    const [workshops, setWorkshops] = useState<Workshop[]>([])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchResults, setSearchResults] = useState<Workshop[]>([])
    const [search, setSearch] = useState(false)

    useEffect(fetchWorkshops, [])

    function fetchWorkshops() {
        axios.get("/api/workshops/")
            .then(r => setWorkshops(r.data))
    }
    function searchHandler() {
        if(searchTerm !== "") {
            setSearch(true)
            setSearchResults(workshops.filter(
                w => w.services.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).length>0))
        }
    }
    function handleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
    }
    function closeSearch() {
        setSearch(false)
        setSearchTerm("")
    }
    return {searchHandler, search, searchResults, closeSearch, searchTerm, handleSearchTerm}
}