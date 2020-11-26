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

    const [time, setTime] = useState({
        timeStart: 0,
        timeElapsed: 0,
    });

    const [clickCoords, setClickCoords] = useState({});

    function checkSelection(char) {
        // GET RANGES FROM BACKEND SERVER
        const {x1, x2, y1, y2} = chars.charsCoords[char];

        // Check if clicked coords within selected char range
        if((x1 < clickCoords.imgX && clickCoords.imgX < x2) 
            && (y1 < clickCoords.imgY && clickCoords.imgY < y2)) {
                setChars({
                    ...chars,
                    charsRemaining: chars.charsRemaining.filter((char) => char !== char),
                    charsFound: [...chars.charsFound, char],
                });
        } else {
            // Popup incorrect message
            console.log('incorrect, boo');
        }
        setClickCoords({});
    }

    const fetchData = async () => {
        const data = await firebaseData('image-data');
        const chars = data[props.choice.imgName];

        setChars({
            charsFound: [],
            charsRemaining: Object.keys(chars),
            charsCoords: chars,
        });
    };

    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
        // component mounting, fetch data, start timer
            fetchData();
            setTime({
                ...time,
                timeStart: Date.now(),
            });
            mounted.current = true;

        } else {
        // component updating, tick timer & check win
            const timerID = setInterval(() => setTime({
                ...time,
                timeElapsed: Date.now() - time.timeStart,
            }) , 1000);
    
            if (chars.charsRemaining.length === 0 && won === false) {
                // Player Won
                clearInterval(timerID)
                setWon(true);
            }
        }
    }, [chars.charsRemaining])

    return (
        <div>
            <InfoBoard 
                chars={chars}
                timeElapsed={time.timeElapsed}
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