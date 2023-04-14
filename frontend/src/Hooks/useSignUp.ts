import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function useSignUp(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [role, setRole] = useState<string>()

    const navigate = useNavigate()
    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }
    function handlePasswordConfirmChange(event: ChangeEvent<HTMLInputElement>){
        setPasswordConfirm(event.target.value)
    }
    function handleRoleChange(event: ChangeEvent<HTMLInputElement>){
        setRole(event.target.value)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(passwordConfirm===password) {
            axios.post("/api/users/", {username, password, role})
                .then(() => navigate("/login"))
                .then(()=>toast.success("Successfully signed up"))
                .catch(error => {
                    if(error.response.status===409){
                        toast.error("Username already exists!")
                    }
                    console.log(error)
                })
        }else{
            toast.error("Passwords don't match")
        }
    }

    return {
        username,
        password,
        passwordConfirm,
        role,
        handleUsernameChange,
        handlePasswordChange,
        handlePasswordConfirmChange,
        handleRoleChange,
        handleSubmit}
}
