import React, { useState } from 'react';

import { Popup } from './Popup';
import { clickCoords } from './clicked-coords';

export const GameBoard = ({ checkSelection, won, imgSource, chars, setClickCoords, }) => {
    const [popupActive, setPopupActive] = useState(false);
    const[screenClick, setScreenClick] = useState({});

    function clicked(e) {
        const { imgX, imgY, screenX, screenY, } = clickCoords(e);

        setPopupActive(!(popupActive));
        setScreenClick({
            screenX,
            screenY,
        });

        setClickCoords({ imgX, imgY, });
    }

    return (
        <div className='gameboard'>
            <div className='gameImage'>   
                <img src={imgSource} onClick={clicked} className={(won)? 'spin' : null}/>
                <div>
                    {chars.charsFound.map(char => {
                        const {x1, x2, y1, y2} = chars.charsCoords[char];
                        const width = x2 - x1;
                        const height = y2 - y1;
                        return (
                            <div 
                            className='foundBox'
                            key={char}
                            style={
                                {
                                    width: width,
                                    height: height,
                                    top: y1,
                                    left: x1,
                                    position: 'absolute',
                                }
                            }>
                            </div>
                        )
                    })}
                </div>
            </div>
            {popupActive 
                && <Popup 
                        x={screenClick.screenX} 
                        y={screenClick.screenY} 
                        charsRemaining={chars.charsRemaining}
                        checkSelection={checkSelection}
                    />
            }
        </div>
    )
}
