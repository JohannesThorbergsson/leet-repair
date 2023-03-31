import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Workshop} from "../model/Workshop";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "./useAuth";

type UseWorkshopsProps = {
    workshops: Workshop[]
}
export default function useWorkshops(props: UseWorkshopsProps) {
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
            setIsSearch(true)
            setSearchResults(props.workshops
                .filter(workshop =>
                    (workshop.services.filter(service =>
                        service.toLowerCase().includes(searchTerm.toLowerCase())).length>0) ||
                    (workshop.inventory.filter(component =>
                        component.category.toLowerCase().includes(searchTerm.toLowerCase())).length>0)))
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
