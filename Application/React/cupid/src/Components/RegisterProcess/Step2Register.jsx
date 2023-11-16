import React, { useState, useEffect } from 'react';
import UserService from '../../Services/UserService';
import loading from '../../assets/images/loading-nobg.gif';
import succes from '../../assets/images/succes-nobg.gif';


function Step2Register({ step2Next, token }) {

    const [verified, setVerified] = useState(false);
    console.log("token1",token);
    const checkVerificationStatus = async () => {
        try {
            const response = await UserService.checkVerificationStatus(token);
            if (response.data.verified === 1) {
                setVerified(true);
            }
        } catch (error) {
            //console.error('Error checking verification status:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkVerificationStatus();
        }, 5000);

        return () => clearInterval(interval);
    }, [token]);

    return (
        <div className='verify-load'>
            {verified ? (
                <>
                    <img src={succes} alt='succes' />
                    <p>Your email has been verified!</p>
                </>
            ) : (
                <>
                    <img src={loading} alt='loading' />
                    <p>Waiting for email verification...</p>
                </>
            )}
        </div>
    );
};

export default Step2Register;
