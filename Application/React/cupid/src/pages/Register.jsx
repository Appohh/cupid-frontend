import React, { useEffect } from 'react';
import Step1Register from '../Components/RegisterProcess/Step1Register';
import Step2Register from '../Components/RegisterProcess/Step2Register';
import Step3Register from '../Components/RegisterProcess/Step3Register';
import Step4Register from '../Components/RegisterProcess/Step4Register';
import RegisterProgress from '../Components/RegisterProcess/RegisterProgress';
import '../Components/RegisterProcess/RegisterProcess.css';
import { useState } from 'react';
import UserService from '../Services/UserService';

function Register() {

    const [error, setError] = useState({
        occured: false,
        message: null
    });

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

    const step3Next = (information) => {
        setRegisterState({
            step: 4,
            information: { ...registerStep.information, ...information }
        });
        setProgress(100);
    };

    const step4Next = () => {
        console.log("1", registerStep.information);
        console.log("2", registerStep.information);
        UserService.createUser(registerStep.information).then((response) => {
            console.log('User created successfully', response.data);
        }).catch((error) => {
            console.error('Error creating user:', error);
            setError({
                occured: true,
                message: error.message
            });
        });
    };
        

    const sendVerificationEmail = () => {
        const request = {
            email: registerStep.information.email,
        }
        UserService.createToken(request)
            .then((response) => {
                console.log('Token created successfully', response.data.token);
                const updatedInformation = {
                    ...registerStep.information,
                    token: response.data.token,
                };
                setRegisterState((prevState) => ({
                    ...prevState,
                    information: updatedInformation,
                }));
            })
            .catch((error) => {
                console.error('Error creating token:', error);
            });
    };

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
                    sendToken={() => { return registerStep.information.token }}
                />
        },
        3: {
            title: 'Step 3',
            description: 'Setup your profile.',
            component: <Step3Register step3Next={step3Next} />
        },
        4: {
            title: 'Congratulations!',
            description: 'Your account has been created, you can now login.',
            component: <Step4Register step4Next={step4Next} />
        }
    };

    const currentStep = steps[registerStep.step];

    return (
        <>
            <section className='section-blank'>
                <h2>Create new account</h2>
                <div className='register-process'>
                    <RegisterProgress progress={progress} />
                    {error.occured ? (
                        <div className='error-div'>
                            <h2>Error occurred. Please try again.</h2>
                            <p>{error.message}</p>
                        </div>
                    ) : (
                        <div className='register-info'>
                            <h2>{currentStep.title}</h2>
                            <h3>{currentStep.description}</h3>
                        </div>
                    )}
                    {currentStep.component}
                </div>
            </section>
        </>
    );
}
export default Register;