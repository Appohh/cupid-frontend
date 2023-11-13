import React from 'react';
import Step1Register from '../Components/RegisterProcess/Step1Register';
import RegisterProgress from '../Components/RegisterProcess/RegisterProgress';
import '../Components/RegisterProcess/RegisterProcess.css';
import { useState } from 'react';


function Register() {
    const [registerStep, setRegisterState] = useState({
        step: 1,
        information: null
    });

    const step1Next = (information) => {
        setRegisterState(() => ({
            step: 2,
            information: information
        }));
    };

    const stepSwitch = () => {
        switch (registerStep.step) {
            case 1:
              return <Step1Register step1Next={step1Next} />;
            case 2:
              return <h2>hello step 2</h2>;
            default:
              return <div>Error: Invalid User step</div>;
          }
    };

    return (
        <>
            <section className='section-blank'>
                <h2>Create new account: {registerStep.step}</h2>
                <h3>{registerStep.information && registerStep.information.email}</h3>
                <div className='register-process'>
                    <RegisterProgress />
                    <div className='register-info'>
                        <h2>Step 1</h2>
                        <h3>Enter login information for your account.</h3>
                    </div>
                    {stepSwitch()}

                </div>
            </section>
        </>
    );
}

export default Register;
