import {ChangeEvent, useState} from "react";
import {Workshop} from "../model/Workshop";

type UseWorkshopsProps = {
    workshops: Workshop[]
}
export default function useWorkshops(props: UseWorkshopsProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchResults, setSearchResults] = useState<Workshop[]>([])
    const [search, setSearch] = useState(false)

    function searchHandler() {
        if(searchTerm !== "") {
            setSearch(true)
            setSearchResults(props.workshops.filter(
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
