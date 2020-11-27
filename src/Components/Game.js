import React, { useState, useEffect, useRef } from "react";

import { InfoBoard } from './InfoBoard';
import { GameBoard } from './GameBoard';
import { firebaseData } from '../firebase-data';


const Game = (props) => {
    const [chars, setChars] = useState({
        charsRemaining: [],
        charsFound: [],
        charsCoords: {},
    });
    const [won, setWon] = useState(false);
    const [timeStart, setTimeStart] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [clickCoords, setClickCoords] = useState({});


    const fetchData = async () => {
        const data = await firebaseData('image-data');
        const chars = data[props.choice.imgName];

        setChars({
            charsFound: [],
            charsRemaining: Object.keys(chars),
            charsCoords: chars,
        });
    };


    function checkSelection(char) {
        // GET RANGES FROM BACKEND SERVER
        const {x1, x2, y1, y2} = chars.charsCoords[char];

        // Check if clicked coords within selected char range
        if((x1 < clickCoords.imgX && clickCoords.imgX < x2) 
            && (y1 < clickCoords.imgY && clickCoords.imgY < y2)) {
                setChars({
                    ...chars,
                    charsRemaining: chars.charsRemaining.filter((remainingChar) => remainingChar !== char),
                    charsFound: [...chars.charsFound, char],
                });
        } else {
            // Popup incorrect message
            console.log('incorrect, boo');
        }
        setClickCoords({});
    }

    
    const mounted = useRef();
    
    useEffect(() => {
        let timerID;
        if (mounted.current) {
        // component updating, tick timer & check win
            timerID = setInterval(() => setTimeElapsed(Date.now() - timeStart), 1000);
    
            if (chars.charsRemaining.length === 0 && won === false) {
                // Player Won
                setWon(true);
                clearInterval(timerID);
            }
        }
        return () => clearInterval(timerID);
    }, [chars.charsRemaining])


    useEffect(() => {
        // component mounting, fetch data, start time
        fetchData();
        setTimeStart(Date.now());
        mounted.current = true;
    }, [])


    return (
        <div>
            <InfoBoard 
                chars={chars}
                timeElapsed={timeElapsed}
                imgName={props.choice.imgName}
                won={won}
            />
            <GameBoard 
                checkSelection={checkSelection}
                won={won}
                imgSource={props.choice.imgSource} 
                chars={chars}
                setClickCoords={setClickCoords}
            />
            {won &&
                <div id='winnerPopup' className='flash'>
                    Congrats, you found 'em!
                </div>
            }
        </div>
    )
}

export { Game }