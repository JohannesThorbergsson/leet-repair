import useAuth from "../Hooks/useAuth";

export default function Dashboard() {
    const user = useAuth(true)
    return (!user? <></>:
        <h1>Dashboard goes here</h1>
    )
}