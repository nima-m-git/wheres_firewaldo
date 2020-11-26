import React from 'react';

import { Highscores } from './Highscores';
import { formatTime } from '../format-time';

export const InfoBoard = ({ chars, timeElapsed, imgName, won, }) => {
    return (
        <div className='infoBoard'>
            <div className='chars'>
                <h4>Remaining: {chars.charsRemaining.map(char => char + ' ')}</h4>
                <h4>Found: {chars.charsFound.map(char => char + ' ')}</h4>
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
