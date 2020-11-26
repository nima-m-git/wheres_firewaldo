import React, { useState } from 'react';

import { Game } from './Game';
import { Choice } from './Choice';

export default function App() {
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
            {choice &&
                <Game choice={choice}/>
                ||
                <Choice setChoice={setChoice} />
            }
        </div>
    )
}