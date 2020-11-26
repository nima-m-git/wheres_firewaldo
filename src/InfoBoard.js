import React from 'react';

import { Highscores } from './Highscores';
import { formatTime } from './format-time';

export const InfoBoard = (props) => {
    return (
        <div className='infoBoard'>
            <div className='chars'>
                <h4>Remaining: {props.charsRemaining.map(char => char + ' ')}</h4>
                <h4>Found: {props.charsFound.map(char => char + ' ')}</h4>
            </div>
            <div id='timer'>
                <h3>Time Elapsed: {formatTime(props.timeElapsed)}</h3>
            </div>
            {props.won &&
                <div id='winnerPopup' className='flash'>
                    Congrats, you found 'em!
                </div>
            }
            <div id='highscores'>
                <Highscores 
                    imgName={props.imgName}
                    won={props.won}
                    score={props.timeElapsed}
                /> 
            </div>
        </div> 
    )
}
