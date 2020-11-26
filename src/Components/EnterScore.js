import React, { useState } from "react";

const EnterScore = ({ imgName, score, }) => {
    const [popupActive, setPopupActive] = useState(true);
    const [name, setName] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const scoreRef = await firebase.firestore().collection('high-scores').doc('high-scores');
        await scoreRef.update({
            [imgName]: firebase.firestore.FieldValue.arrayUnion({
                name,
                score,
            })
        });
        setPopupActive(false);
    }

    return (
        <div>
            {popupActive &&
                <form onSubmit={handleSubmit} id='highscorePopup'>
                    <label>Enter Your Name:
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <input type='submit' value='Submit' className='submit Btn'/>
                </form>
            }
        </div>
    )
}

export { EnterScore }