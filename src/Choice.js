import React from "react";
import choices from './choices';

function Choice({ setChoice }) {
    return (
        <div className='choice Btn'>
            {choices.map((choice) => 
                <button type='submit' key={choice.title} onClick={() => setChoice(choice)}>{choice.title}</button>
            )}
        </div>
    )
}

export { Choice }