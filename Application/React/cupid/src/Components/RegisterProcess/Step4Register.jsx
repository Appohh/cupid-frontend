import React, { useEffect } from 'react';


function Step4Register({ step4Next }) {
    console.log('Step4Register rendered');


    useEffect(() => {
        step4Next();
    }, []);

    return (
        <>
            <h1>hey</h1>
        </>
    );
}

export default Step4Register;
