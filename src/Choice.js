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
                        {choices.map((choice) => 
                            <button type='submit' onClick={() => setChoice(choice)}>{choice.title}</button>
                        )}
                    </div>
            }
        </div>
    )
}

export { Choice }