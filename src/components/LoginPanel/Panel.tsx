import React, {useEffect} from "react";
import {IUser} from "../Login/IUser";

type PanelProps = {
    user: IUser
}

const Panel = ({user}: PanelProps) => {
    useEffect(() => {
        console.log(user)
    })

    return (<div>
        <h1>Hello {user.name}</h1>
    </div>);
}


export default Panel;