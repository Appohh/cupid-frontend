import React from 'react';
import { useForm } from 'react-hook-form';
import UserService from '../../Services/UserService';
import { Context } from '../../App.jsx';

const PreferencePopup = () => {
    const { register, handleSubmit } = useForm();
    const { loggedUser } = useContext(Context);

    const onSubmit = (data) => {
        console.log(data);
        console.log("popup",loggedUser);
    };

    return (
        <div className="form-register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Gender:
                    <input type="text" {...register("gender")} />
                </label>
                <label>
                    Age:
                    <input type="number" {...register("age")} />
                </label>
                <label>
                    Distance:
                    <input type="number" {...register("distance")} />
                </label>
                <label>
                    Body Type:
                    <input type="text" {...register("bodytype")} />
                </label>
                <label>
                    Ethnicity:
                    <input type="text" {...register("ethnicity")} />
                </label>
                <button type="submit">Save Preferences</button>
            </form>
        </div>
    );
};

export default PreferencePopup;
