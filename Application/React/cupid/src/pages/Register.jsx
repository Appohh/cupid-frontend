import React, { useEffect } from 'react';
import Step1Register from '../Components/RegisterProcess/Step1Register';
import Step2Register from '../Components/RegisterProcess/Step2Register';
import RegisterProgress from '../Components/RegisterProcess/RegisterProgress';
import '../Components/RegisterProcess/RegisterProcess.css';
import { useState } from 'react';
import UserService from '../Services/UserService';

function Register() {

    const [progress, setProgress] = useState(25);

    const [registerStep, setRegisterState] = useState({
        step: 1,
        information: null
    });

    useEffect(() => {
        if (registerStep.step === 2) {
            sendVerificationEmail();
        }
    }, [registerStep.step]);

    //step next actions
    const step1Next = (information) => {
        setRegisterState({
            step: 2,
            information: information
        });
        setProgress(50);
    };

    const step2Next = (information) => {
        setRegisterState({
            step: 3,
            information: { ...registerStep.information, ...information }
        });
        setProgress(75);
    };

    const sendVerificationEmail = () => {
        const request = {
            email: registerStep.information.email,
        }
        UserService.createToken(request).then((response) => {
            console.log('Token created successfully' + response.data.token);
            setRegisterState({
                ...registerStep,
                information: { ...registerStep.information, ...information, token: response.data.token }
            });
            console.log("registerstep",registerStep);
        }).catch(error => {
            console.error('Error creating token:', error);
        });
    }

    const steps = {
        1: {
            title: 'Step 1',
            description: 'Enter login information for your account.',
            component: <Step1Register step1Next={step1Next} />
        },
        2: {
            title: 'Step 2',
            description: 'Verify your email address.',
            component: 
                <Step2Register
                    step2Next={step2Next}
                    token={registerStep.information?.token}
                />
        }
    };

    const currentStep = steps[registerStep.step];

    return (
        <>
            <section className='section-blank'>
                <h2>Create new account</h2>
                <div className='register-process'>
                    <RegisterProgress progress={progress} />
                    <div className='register-info'>
                        <h2>{currentStep.title}</h2>
                        <h3>{currentStep.description}</h3>
                    </div>
                    {currentStep.component}
                </div>
            </section>
        </>
    );
}
export default Register;