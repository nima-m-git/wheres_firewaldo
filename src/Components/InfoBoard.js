import React from 'react';

import { Highscores } from './Highscores';
import { formatTime } from '../format-time';

export const InfoBoard = ({ chars, timeElapsed, imgName, won, }) => {
    return (
        <div className='infoBoard'>
            <div className='chars'>
                <p><strong>Remaining: </strong>{chars.charsRemaining.map(char => char + ', ')}</p>
                <p><strong>Found: </strong>{chars.charsFound.map(char => char + ', ')}</p>
            </div>
            <div id='timer'>
                <h3>Time Elapsed: {formatTime(timeElapsed)}</h3>
            </div>
            <div id='highscores'>
                <Highscores 
                    imgName={imgName}
                    won={won}
                    score={timeElapsed}
                /> 
            </div>
        </div> 
    )
}
