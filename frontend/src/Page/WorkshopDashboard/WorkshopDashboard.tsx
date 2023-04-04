import useAuth from "../../Hooks/useAuth";

export default function WorkshopDashboard(){
    const user = useAuth(true)

    return(
        <>
        Workshop Dashboard
        </>
    )
}
