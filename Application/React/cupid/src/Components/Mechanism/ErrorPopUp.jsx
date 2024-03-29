import React, { useContext, useEffect } from 'react';
import { Context } from '../../App.jsx';
import { useLocation } from 'react-router-dom';

const ErrorPopUp = () => {
    const currentLocation = useLocation();
    const context = useContext(Context);
    const { errorPopUp, setErrorPopUp } = context;

    console.log("context", context);


    useEffect(() => {
        if (errorPopUp && errorPopUp.location !== currentLocation.pathname) {
            setErrorPopUp(null);
        }
    }, [currentLocation, errorPopUp]);

    if (!errorPopUp || !errorPopUp.title || !errorPopUp.message || !errorPopUp.color || !errorPopUp.location) {
        return null;
    }

    const { title, message, color, location } = errorPopUp;


    return (
        <div className='error-popup' style={{ backgroundColor: color }}>
            <div className='error-message'>
                <h1>{title}</h1>
                <p>{message}</p>
            </div>
            <span className='clickable' onClick={() => setErrorPopUp(null)}>X</span>
        </div>
    );
};

export default ErrorPopUp;
