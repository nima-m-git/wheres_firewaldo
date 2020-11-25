import React from "react";

import { EnterScore } from './EnterScore';

import { firebaseData } from './firebase-data';
import { formatTime } from './format-time';


class Highscores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
        };
    }

    async componentDidMount() {
        const data = await firebaseData('high-scores');
        const topFive = data[this.props.imgName].sort((a, b) => (a.score > b.score) ? 1 : -1).slice(0, 5);
        this.setState({
            scores: topFive,
        })
    }

    render() {
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
                            {this.state.scores.map(score => 
                                <tr key={score.name + score.score}>
                                    <td>{score.name}</td>
                                    <td>{formatTime(score.score)}</td>    
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {this.props.won 
                    && (this.state.scores.some(score => this.props.score < score.score) || this.state.scores.length <= 5)
                    && <EnterScore 
                            score={this.props.score} 
                            imgName={this.props.imgName}
                            active={true}
                        />
                }
            </div>
        )
    }
}

export { Highscores }