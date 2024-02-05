import React, { useState, useEffect, useRef } from 'react';
import './ProfileCard.css'

function ProfileCard({ targetUser, setCardPosition, parentSetDragging, currentClass, resetCardPosition, setResetCardPosition }) {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);


    const handleMouseDown = (e) => {
        setDragging(true);
        parentSetDragging(true);
        setPosition({
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        });
        setCardPosition(e.target.getBoundingClientRect());
        cardRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (dragging && e.buttons === 1) {
            setPosition({
                x: e.clientX - window.innerWidth / 2,
                y: e.clientY - window.innerHeight / 2
            });
            setCardPosition(e.target.getBoundingClientRect());
        } else if (dragging && e.buttons === 0) {
            setDragging(false);
            parentSetDragging(false);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        parentSetDragging(false);
        cardRef.current.style.cursor = 'grab';
    };


    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    useEffect(() => {
        if (resetCardPosition) {
            setPosition({ x: 0, y: 0 });
            setResetCardPosition(false);
        }
    }, [resetCardPosition]);

    return (
        <div
            className={`profile-card current-profile-card-${currentClass}`}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            onMouseDown={handleMouseDown}
            ref={cardRef}
        >
            <div className="profile-img" style={{ backgroundImage: `url(src/assets/uploaded-images/${targetUser.pimage})` }}></div>
            <div className="profile-info">
                <h2 className="name">{targetUser.fname}, {new Date().getFullYear() - new Date(targetUser.birthday).getFullYear()}</h2>
                <p className="location">5km away</p>
                <p className="bio">{targetUser.bio}</p>
            </div>
        </div>
    );
}

export default ProfileCard;