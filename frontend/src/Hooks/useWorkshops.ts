import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Workshop} from "../model/Workshop";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

export default function useWorkshops() {
    const user = useAuth(true)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchTerm, setSearchTerm]
        = useState<string>(location.state?.searchTerm ?? "")
    const [searchResults, setSearchResults] = useState<Workshop[]>([])
    const [isSearch, setIsSearch] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(search, [])
    function searchHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        search()
    }
    function search(){
        if(searchTerm !== "") {
            axios.get("api/workshops/search/" + searchTerm)
                .then(r => r.data)
                .then(results => setSearchResults(results))
                .then(() => setIsSearch(true))
                .catch((error) => console.error(error))
        }
    }
    function handleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
    }
    function closeSearch() {
        setIsSearch(false)
        setSearchTerm("")
    }
    return {searchHandler, isSearch, searchResults, closeSearch, searchTerm, handleSearchTerm, navigate, location, user}
}
