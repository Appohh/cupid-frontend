import React, { useState, useEffect } from 'react';
import UserService from '../../Services/UserService';
import loading from '../../assets/images/loading-nobg.gif';
import succes from '../../assets/images/succes-nobg.gif';


function Step2Register({ step2Next, sendToken }) {

    const [verified, setVerified] = useState(false);
    useEffect(() => {
        let token = sendToken(); // Get the initial token
        console.log("token1",token);
    
        const checkVerificationStatus = async () => {
            try {
                const response = await UserService.checkVerificationStatus(token);
                if (response.data === 1) {
                    setVerified(true);
                } else {
                    setTimeout(checkVerificationStatus, 5000); // Re-check after 5 seconds if not verified
                }
            } catch (error) {
                // Handle error
            }
        };
    
        checkVerificationStatus(); // Initial check
    
        return () => {
            // Cleanup if component unmounts
            // Clear any ongoing setTimeouts
            clearTimeout(checkVerificationStatus);
        };
    }, [sendToken]);

    return (
        <>
        <div className='verify-load'>
            {verified ? (
                <>
                    <img src={succes} alt='succes' />
                    <p>Your email has been verified!</p>
                    <button className='btn-white clickable' onClick={() => step2Next()}>Next</button>
                </>
            ) : (
                <>
                    <img src={loading} alt='loading' />
                    <p>Waiting for email verification...</p>
                </>
            )}
        </div>
        </>
    );
};

export default Step2Register;
