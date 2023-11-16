import React from 'react';
import { useRef } from 'react';

function RegisterProgress({ progress }) {
    const progressBarRef = useRef(null);

    const updateProgressBarWidth = (width) => {
        if (progressBarRef.current) {
            progressBarRef.current.style.width = width;
        }
    };

    updateProgressBarWidth(`${progress}%`);


    return (
        <div className='register-process-steps'>
            <span ref={progressBarRef} className='progress-bar'></span>
            <div className='step'>
                <span>1</span>
                <p>Basic info</p>
            </div>
            <div className='step'>
                <span>2</span>
                <p>Profile info</p>
            </div>
            <div className='step'>
                <span>3</span>
                <p>Profile picture</p>
            </div>
            <div className='step'>
                <span>4</span>
                <p>Done</p>
            </div>
        </div>
    );
}

export default RegisterProgress;
