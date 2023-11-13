import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';


function Step1Register({ step1Next }) {
    const { register, handleSubmit, watch } = useForm();
    const [passwordMatch, setPasswordMatch] = useState(true);

    const onSubmit = (data) => {
        console.log(data);
        step1Next(data);
    };



    const handleExternalSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleConfirmPasswordChange = (e) => {
        const password = watch('password');
        const confirmPassword = e.target.value;
        setPasswordMatch(password === confirmPassword);
    };

    return (
        <>
        <form className='form-register' onSubmit={handleSubmit(onSubmit)}>
            <label>
                First Name:
                <input type='text' {...register("fName")} />
            </label>
            <label>
                Last Name:
                <input type='text' {...register("lName")} />
            </label>
            <label>
                Birthday:
                <input type='text' {...register("birthday")} />
            </label>
            <label>
                Email:
                <input type='email' {...register("email")} />
            </label>
            <label>
                Phone:
                <input type='tel' {...register("phone")} />
            </label>
            <label>
                Gender:
                <select {...register("gender")}>
                    <option value={''}>Select Gender</option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                    <option value={2}>Other</option>
                </select>
            </label>
            <label>
                Password:
                <input type='password' {...register("password")} />
            </label>
            <label>
                Confirm password:
                <input type='password' onChange={handleConfirmPasswordChange} style={{outline: '1px solid ' + (passwordMatch ? 'green' : 'red'), border: 'none'}} />
            </label>
        </form>
        <div></div>
        <button className='btn-register-submit clickable' onClick={handleExternalSubmit}>Next</button>
        </>
    );
}

export default Step1Register;
