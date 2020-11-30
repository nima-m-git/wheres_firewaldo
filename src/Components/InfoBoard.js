import React from 'react';

import { Highscores } from './Highscores';
import { formatTime } from '../format-time';

export const InfoBoard = ({ chars, timeElapsed, imgName, won, }) => {
    const formattedChars = (chars) => chars.map((char, index) => char + ((index < chars.length-1 ) ? ', ' : '.'));
    
    return (
        <div className='infoBoard'>
            <div className='chars'>
                <p><strong>Remaining: </strong> {formattedChars(chars.charsRemaining)}</p>
                <p><strong>Found: </strong> {formattedChars(chars.charsFound)}</p>
            </div>
            <div id='timer'>
                <h3>Time Elapsed: {formatTime(timeElapsed)}</h3>
            </div>
            {won &&
                <div id='highscores'>
                    <Highscores 
                        imgName={imgName}
                        won={won}
                        score={timeElapsed}
                    /> 
                </div>
            }
        </div> 
    )
}
