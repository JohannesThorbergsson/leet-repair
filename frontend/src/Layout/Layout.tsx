import {ReactNode} from "react";
import LogOutButton from "../LogOutButton/LogOutButton";

type Props = {
    children: ReactNode
}
export default function Layout({children}: Props) {
    return (
        <div>
            <div>
                <LogOutButton/>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}