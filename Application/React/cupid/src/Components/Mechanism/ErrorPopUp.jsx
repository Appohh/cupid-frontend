import React, {useContext} from 'react'
import { Context } from '../../App.jsx'

const ErrorPopUp = () => {
    
    const context = useContext(Context);
    const { errorPopUp } = context;

    console.log("context", context)
    
    if (!errorPopUp || !errorPopUp.title || !errorPopUp.message || !errorPopUp.color) {
        return <div>An unexpected error has occurred, please contact an administrator.</div>;
    }

    const { title, message, color } = errorPopUp;

    
    return (
        <div className='error-popup' style={{ backgroundColor: color }}>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPopUp