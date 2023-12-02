import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRef } from 'react';


function Step3Register({ step3Next }) {
    const { register, handleSubmit } = useForm();
    const [imageBase64, setImageBase64] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const profilePic = useRef(null);

    const onSubmit = (data) => {
        console.log(data);
        step3Next({ ...data, pimage: imageBase64 });
    };

    const handleExternalSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSizeInBytes) {
                alert('Image size exceeds the limit (5MB).');

                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setImageBase64(base64String);
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <form className='form-register form-profile' onSubmit={handleSubmit(onSubmit)}>
                <div ref={profilePic} className='profile-container' style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : 'none'
                }}>
                </div>
                <label>
                    Profile Picture:
                    <input onChange={handleFileChange} type='file' accept='image/png' />
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
