import React from 'react';
import Step1Register from '../Components/RegisterProcess/Step1Register';
import RegisterProgress from '../Components/RegisterProcess/RegisterProgress';
import '../Components/RegisterProcess/RegisterProcess.css';
import { signal } from '@preact/signals-react';


function Register() {
     const registerEmail = signal('?');
    return (
        <>
            <section className='section-blank'>
                <h2>Create new account: {registerEmail.value}</h2>
                <div className='register-process'>
                    <RegisterProgress />
                    <div className='register-info'>
                        <h2>Step 1</h2>
                        <h3>Enter login information for your account.</h3>
                    </div>
                    <Step1Register registerEmail={registerEmail} />
                </div>
            </section>
        </>
    );
}

export default Register;
