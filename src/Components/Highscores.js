import React, { useState, useEffect } from "react";

import { EnterScore } from './EnterScore';
import { firebaseData } from '../firebase-data';
import { formatTime } from '../format-time';


const Highscores = ({ imgName, won, score, }) => {
    const [scores, setScores] = useState([]);

    const fetchScores = async () => {
        const data = await firebaseData('high-scores');
        const topFive = data[imgName].sort((a, b) => (a.score > b.score) ? 1 : -1).slice(0, 5);
        setScores(topFive);
    }

    useEffect(() => {
        fetchScores();
    }, [])

    return (
        <div>
            <div id='high-scores'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map(score => 
                            <tr key={score.name + score.score}>
                                <td>{score.name}</td>
                                <td>{formatTime(score.score)}</td>    
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {won 
                && (scores.some(score => score < score.score) || scores.length <= 5)
                && <EnterScore 
                        score={score} 
                        imgName={imgName}
                    />
            }
        </div>
    )
}

export { Highscores }