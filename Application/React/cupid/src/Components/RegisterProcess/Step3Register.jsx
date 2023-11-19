import React from 'react';
import { useForm } from 'react-hook-form';


function Step3Register({ step3Next }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        step3Next(data);
    };

    const handleExternalSubmit = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <>
            <form className='form-register form-profile' onSubmit={handleSubmit(onSubmit)}>
                <div className='profile-container'></div>
                <label>
                    Profile Picture:
                    <input type='text' {...register("pimage")} />
                </label>
                <label>
                    Bio:
                    <textarea style={{ resize: 'vertical', maxHeight: '200px' }} type='text' {...register("bio")} />
                </label>
            </form>
            <button className='btn-register-submit btn-white clickable' onClick={handleExternalSubmit}>Next</button>
        </>
    );
}

export default Step3Register;
