import React from "react";

const Popup = ({ x, y, charsRemaining, checkSelection, }) => {
    return (
        <div className='selections'>
            <div 
                className='selectionMenu'
                style={{
                    top: y - 60,
                    left: x - 30,
                    width: 60,
                    position: 'absolute'
                }} 
            >
                <select 
                    onChange={(e) => checkSelection(e.target.value)}
                >
                    <option value='select' key='select'></option>
                    {charsRemaining.map((char) => <option value={char} key={char}>{char}</option>)}
                </select>
            </div>
            <div
                className='selectionBox'
                style={{
                    top: y - 40,
                    left: x - 30,
                    height: 120,
                    width: 60,
                    border: '1px dashed black',
                    position: 'absolute'
                }}
            >
            </div>
        </div> 
    )
}

export { Popup }