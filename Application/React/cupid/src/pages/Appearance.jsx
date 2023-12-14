import React from 'react';
import { useForm } from 'react-hook-form';
import UserService from '../Services/UserService';
import { Context } from '../App.jsx';
import { useContext } from 'react';

const Appearance = () => {
    const { register, handleSubmit } = useForm();
    const { loggedUser } = useContext(Context);

    const onSubmit = (data) => {
        console.log(data);
        console.log("popup", loggedUser);
        
        const updatedData = {
            ...data,
            location: data.location,
            gender: parseInt(data.gender),
            bodyType: parseInt(data.bodyType),
            ethnicity: parseInt(data.ethnicity),
            userId: parseInt(loggedUser.id)
        };

        console.log("updatedData", updatedData);

        UserService.updateUserAppearance(updatedData).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <div className="center-content" id='preference-content'>
            <div className="login-box">
                <h2>Appearance</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="user-box">
                        <select {...register("gender")} required>
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                        </select>
                    </div>
                    <div className="user-box">
                        <input type="text" {...register("location")} required />
                        <label>Location</label>
                    </div>
                    <div className="user-box">
                        <select {...register("bodyType")} required>
                            <option value="">Select Body Type</option>
                            <option value="1">Slim</option>
                            <option value="2">Average</option>
                            <option value="3">Athletic</option>
                            <option value="4">Curvy</option>
                        </select>
                    </div>
                    <div className="user-box">
                        <select {...register("ethnicity")} required>
                            <option value="">Select Ethnicity</option>
                            <option value="1">Asian</option>
                            <option value="2">Black</option>
                            <option value="3">White</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button style={{ color: '#ff6f6f' }} className="btn" type="submit">Save Appearance</button>
                </form>
            </div>
        </div>
    );
};

export default Appearance;
