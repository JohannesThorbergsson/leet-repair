import Layout from "../Layout/Layout";
import useAuth from "../Hooks/useAuth";
import useWorkshops from "../Hooks/useWorkshops";
import WorkshopCard from "../WorkshopCard/WorkshopCard";

export default function Dashboard() {
    const user = useAuth(true)
    const {searchHandler, searchResults, search, closeSearch, searchTerm, handleSearchTerm} = useWorkshops()



    return (user &&
        <Layout>
            <input type={"text"} value={searchTerm} onChange={handleSearchTerm}/>
            <button onClick={searchHandler}>Search</button>
            {!search?
            <h1>Dashboard</h1>:
            <div>Search results
                {searchResults.map((workshop) =><WorkshopCard key={workshop.id} workshop={workshop}/>)}
                <button onClick={closeSearch}>Back</button>
            </div> }
        </Layout>
    )
}