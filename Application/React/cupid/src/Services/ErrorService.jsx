import { useContext } from 'react'
import { Context } from '../App.jsx'
import ErrorPopUp from '../Components/Mechanism/ErrorPopUp.jsx'

export function SetError(title, message, color) {
    console.log("SetError")
    const { setErrorPopUp } = useContext(Context);

    setErrorPopUp({
        title: title,
        message: message,
        color: color
    });
}

export function ShowError() {
    console.log("ShowError")
    return <ErrorPopUp />
}
