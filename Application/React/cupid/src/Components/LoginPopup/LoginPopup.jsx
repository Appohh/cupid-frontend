import '../LoginPopup/LoginPopup.css';
import React, { useState } from 'react';
import axios from 'axios';
import UserService from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { Context } from '../../App.jsx'

const LoginPopup = ({ onClose }) => {

    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useContext(Context)

    const Authenticate = () => {
        UserService.authenticateUser(formData)
            .then(data => OnSucces(data))
            .catch(error => console.log('Authentication failed:', error));
    }

    const OnSucces = (data) => {
        console.log('Authentication successful:', data)
        setLoggedUser(mapToUser(data))
        navigate('/foryou');
        onClose()
    }

    const mapToUser = (dataResponse) => {
        const userJSON = dataResponse.data;

        const user = {
            id: userJSON.id,
            birthday: userJSON.birthday,
            email: userJSON.email,
            phone: userJSON.phone,
            gender: userJSON.gender,
            bio: userJSON.bio,
            lname: userJSON.lname,
            fname: userJSON.fname,
            pimage: userJSON.pimage,
        };

        return user
    }

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        Authenticate();
    };

    return (
        <div className='login-popup-wrap'>
            <div className='login-popup'>
                <span onClick={onClose} className='close'></span>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input name='email' type="email" placeholder='Your email..' onChange={handleChange} required />
                    </div>
                    <div>
                        <input name='password' type="password" placeholder='Your password..' onChange={handleChange} required />
                    </div>
                    <h3 className='errors'></h3>
                    <button className="btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPopup;
