import React, { useState } from "react";

import { Game } from './Game';
import choices from './choices';

function Choice() {
    const [choice, setChoice] = useState(null);

    return (
        <div className='container'>
            <div className='header'>
                <h1>Let's Find</h1>
                {choice &&
                    <div>
                        <h2>{choice.title}</h2>
                        <div className='backButton'>
                            <button onClick={() => window.location.reload()}>Back</button>
                        </div>
                    </div> 
                }
            </div>
            {choice 
                && <Game choice={choice}/>
                ||  <div className='choice Btn'>
                        <button type='submit' value='waldo' onClick={(e) => setChoice(choices[e.target.value])}>Waldo</button>
                        <button type='submit' value='futurama' onClick={(e) => setChoice(choices[e.target.value])}>Futurama</button>
                    </div>
            }
        </div>
    )
}

export { Choice }