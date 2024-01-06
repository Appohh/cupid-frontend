import React from 'react';
import { useState, useRef, useEffect } from 'react';
import ProfileCard from '../ProfileCards/ProfileCard';
import './Deck.css'

const Deck = ({ cards }) => {
    const [potentialMatches, setPotentialMatches] = useState([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [CurrentCardPosition, setCurrentCardPosition] = useState(null);
    const [dragging, setDragging] = useState(false);
    const deckLeftRef = useRef(null);
    const deckRightRef = useRef(null);

    useEffect(() => {
        setPotentialMatches(cards)
        console.log("Deck", potentialMatches)
    }, [cards]);

    useEffect(() => {
        if (CurrentCardPosition) {
            const deckLeftPosition = deckLeftRef.current.getBoundingClientRect();
            const deckRightPosition = deckRightRef.current.getBoundingClientRect();

            if (CurrentCardPosition.left < deckLeftPosition.right && CurrentCardPosition.right > deckLeftPosition.left) {
                deckLeftRef.current.style.opacity = '1';
            } else {
                deckLeftRef.current.style.opacity = '0';
            }

            if (CurrentCardPosition.right > deckRightPosition.left && CurrentCardPosition.left < deckRightPosition.right) {
                deckRightRef.current.style.opacity = '1';
            } else {
                deckRightRef.current.style.opacity = '0';
            }
        }
    }, [CurrentCardPosition]);

    useEffect(() => {
        if (CurrentCardPosition && dragging === false) {
            const deckLeftPosition = deckLeftRef.current.getBoundingClientRect();
            const deckRightPosition = deckRightRef.current.getBoundingClientRect();

            //if card is let on left
            if (CurrentCardPosition.left < deckLeftPosition.right && CurrentCardPosition.right > deckLeftPosition.left) {
                //swipe left
                const cardElement = document.querySelector(`.current-profile-card-${currentCardIndex}`);
                if (cardElement) {
                    cardElement.classList.add('swipe-left');
                    cardElement.addEventListener('animationend', function () {
                        cardElement.style.display = 'none';
                    });
                }
                handleSwipe(0);
            }
            //if card is let on right
            if (CurrentCardPosition.right > deckRightPosition.left && CurrentCardPosition.left < deckRightPosition.right) {
                //swipe right
                const cardElement = document.querySelector(`.current-profile-card-${currentCardIndex}`);
                if (cardElement) {
                    cardElement.classList.add('swipe-right');
                    cardElement.addEventListener('animationend', function () {
                        cardElement.style.display = 'none';
                    });
                }
                handleSwipe(1);
            }
        }
    }, [dragging]);

    const handleSwipe = (direction) => {
        console.log("swiped", direction)
        setCurrentCardIndex(currentCardIndex + 1);
        //swipe service
    }

    return (
        <div className="deck">
            <div className='deck-left'
                ref={deckLeftRef}>
                <span></span>
            </div>
            <div className='deck-center'>
                {[...potentialMatches].reverse().map((potentialMatch, index) => {
                    return <ProfileCard key={potentialMatch.id} targetUser={potentialMatch} setCardPosition={setCurrentCardPosition} parentSetDragging={setDragging} currentClass={potentialMatches.length - index - 1} />
                })}
                {currentCardIndex >= potentialMatches.length && <p>No more cards left to display.</p>}
            </div>
            <div className='deck-right'
                ref={deckRightRef}>
                <span></span>
            </div>
        </div>
    );
};

export default Deck;