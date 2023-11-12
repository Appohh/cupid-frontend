import React from 'react';

function RegisterProgress() {
    return (
        <div className='register-process-steps'>
            <span className='progress-bar'></span>
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
