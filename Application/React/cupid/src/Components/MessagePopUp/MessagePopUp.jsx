import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../App.jsx';

const MessagePopUp = ({ onClose, receiverId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loggedUser, setErrorPopUp, setSendNotification } = useContext(Context);
    

    const onSubmit = (data) => {
        console.log('Form data submitted:', data);
        alert('Message sent!', data);
        setSendNotification({ receiverId: receiverId, text: loggedUser.fname + ": " + data.message })
    };

    return (
        <div className='login-popup-wrap'>
            <div className='login-popup'>
                <span onClick={onClose} className='close'></span>
                <h2 style={{ color: 'white' }}>Send a message</h2>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <input name='message' type="text" placeholder='Your message..' {...register('message')} required/>
                    {errors.message && <p className='error'>Message is required</p>}
                    <button className="btn" type="submit">Send</button>
                </form>
                <div className='errors'>
                    {/*errors*/}
                </div>
            </div>
        </div>
    );
};

export default MessagePopUp;