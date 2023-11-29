import React, {useContext} from 'react'
import { Context } from '../../App.jsx'

const ErrorPopUp = () => {
    
    const context = useContext(Context);
    const { errorPopUp } = context;

    console.log("context", context)
    
    if (!errorPopUp || !errorPopUp.title || !errorPopUp.message || !errorPopUp.color) {
        return null;
    }

    if (errorPopUp.show === false) {
        return null;
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