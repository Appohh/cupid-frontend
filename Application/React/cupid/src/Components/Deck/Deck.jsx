import React from 'react';
import { useState, useRef, useEffect } from 'react';
import ProfileCard from '../ProfileCards/ProfileCard';
import './Deck.css'
import SwipeService from '../../Services/SwipeService';
import MatchService from '../../Services/MatchService';

const Deck = ({ cards, userId }) => {
    const [potentialMatches, setPotentialMatches] = useState([])
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [CurrentCardPosition, setCurrentCardPosition] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [resetCardPosition, setResetCardPosition] = useState(false);
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

            //reset card position
            setResetCardPosition(true);


        }
    }, [dragging]);

    const handleSwipe = (direction) => {
        console.log("swiped", direction)
        setCurrentCardIndex(currentCardIndex + 1);

        //create swipe request
        const createSwipeRequest = {
            origin_userId: userId,
            target_userId: potentialMatches[currentCardIndex].id,
            direction: direction
        }

        let createdSwipeId = null;

        //send swipe request
        SwipeService.createSwipe(createSwipeRequest).then((response) => {
            console.log("swipe response", response)
            createdSwipeId = response?.data?.id;
            //check if match
            SwipeService.checkMatch(createSwipeRequest).then((response) => {
                console.log("check match response", response)
                if (response.data) {
                    //create match
                    console.log("match true")
                    const createMatchRequest = {
                        userId1: createSwipeRequest.origin_userId,
                        userId2: createSwipeRequest.target_userId
                    }
                    //send match request
                    MatchService.createMatch(createMatchRequest).then((response) => {
                        console.log("match response", response)
                    }).catch((error) => {
                        //if match could not be made delete swipe
                        SwipeService.deleteSwipe(createdSwipeId).then((response) => {
                            console.log("delete swipe response", response)
                        }).catch((error) => {
                            console.log("delete swipe error", error);
                        });
                        console.log("error", error);
                    });
                }
            }).catch((error) => {
                console.log("error", error);
            });
        }).catch((error) => {
            console.log("error", error);
        });
    }

    return (
        <div className="deck">
            <div className='deck-left'
                ref={deckLeftRef}>
                <span></span>
            </div>
            <div className='deck-center'>
                {[...potentialMatches].reverse().map((potentialMatch, index) => {
                    return <ProfileCard key={potentialMatch.id} targetUser={potentialMatch} setCardPosition={setCurrentCardPosition} parentSetDragging={setDragging} currentClass={potentialMatches.length - index - 1} resetCardPosition={resetCardPosition} setResetCardPosition={setResetCardPosition} />
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