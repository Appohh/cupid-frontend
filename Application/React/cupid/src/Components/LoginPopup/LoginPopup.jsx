import '../LoginPopup/LoginPopup.css';
import React, { useState } from 'react';
import UserService from '../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { Context } from '../../App.jsx'

const LoginPopup = ({ onClose }) => {

    const navigate = useNavigate();
    const { loggedUser, setLoggedUser } = useContext(Context);
    // const context = useContext(Context)
    // const [loggedUser, setLoggedUser] = [context.loggedUser, context.setLoggedUser]
    const [error, setError] = useState(null);


    const Authenticate = () => {
        UserService.authenticateUser(formData)
            .then(data => onSuccess(data))
            .catch(error => {
                setError('Failed to authenticate, please try again.');
                console.error('Authentication failed:', error);
                if (error.response && error.response.status === 401) {
                setError('Wrong credentials, please try again.');
                }
            });
    }

    const onSuccess = (data) => {
        if (data && data.data) {
            console.log('Authentication successful:', data)
            //set token in local storage
            localStorage.setItem('jwt', data.data)
            // setLoggedUser(mapToUser(data))
            navigate('/foryou');
            onClose()
        } else {
            console.error('Unexpected data format:', data);
            setError('Unexpected error. Please try again.');
        }
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
                <form className='login-form' onSubmit={handleSubmit}>
                    <input name='email' type="email" placeholder='Your email..' onChange={handleChange} required />
                    <input name='password' type="password" placeholder='Your password..' onChange={handleChange} required />
                    <button className="btn" type="submit">Login</button>
                </form>
                <p className='login-register'>Don't have an account? <a href="/register">Register</a></p>
                <div className='errors'>
                    {error && <p className='error'>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;
