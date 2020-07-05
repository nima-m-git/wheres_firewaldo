import React from "react";
import ReactDOM from "react-dom";

import WaldoDistance from './assets/waldo-social-distance.jpg';
import Futurama from './assets/futurama.png';

import './index.css';
import { firebaseData } from './firebase-data';
import { clickCoords } from './clicked-coords';
import { formatTime } from './format-time'


class EnterScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupActive: this.props.active,
            name: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const scoreRef = firebase.firestore().collection('high-scores').doc('high-scores');

        scoreRef.update({
            [this.props.imgName]: firebase.firestore.FieldValue.arrayUnion({
                name: this.state.name,
                score: this.props.score,
            })
        });

        this.setState({
            popupActive: false,
        })
    }

    render() {
        return (
            <div>
                {this.state.popupActive &&
                    <form onSubmit={this.handleSubmit} id='highscorePopup'>
                        <label>Enter Your Name:
                            <input type='text' value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type='submit' value='Submit' class='submit Btn'/>
                    </form>
                }
            </div>
        )
    }
}


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


const Popup = (props) => {
    const {x, y, value, charsRemaining, selection} = props;
    return (
        <div className='selections'>
            <div 
                className='selectionMenu'
                style={
                    {
                        top: y - 60,
                        left: x - 30,
                        width: 60,
                        position: 'absolute'
                    }
                } 
            >
                <select value={value} onChange={selection}>
                    <option value='select' key='select'></option>
                    {charsRemaining.map((char) => <option value={char} key={char}>{char}</option>)}
                </select>
            </div>
            <div
                className='selectionBox'
                style={
                    {
                        top: y - 40,
                        left: x - 30,
                        height: 120,
                        width: 60,
                        border: '1px dashed black',
                        position: 'absolute'
                    }
                }
            >
            </div>
        </div> 
    )
}


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.imgName = this.props.choice.imgName;
        this.imgSrc = this.props.choice.imgSource;
        this.state = {
            charsRemaining: [],
            charsFound: [],
            charsCoords: {},
            popupActive: false,
            clickedX: null,
            clickedY: null,
            value: 'chek',
            won: false,
            timeStart: null,
            timeElapsed: null,
        }
        this.clicked = this.clicked.bind(this)
        this.selection = this.selection.bind(this)
    }

    clicked(e) {
        const {clickedX, clickedY} = clickCoords(e)
        this.setState({
            popupActive: (this.state.popupActive)? false : true,
            clickedX,
            clickedY,
        })
    }

    selection(e) {
        const value = e.target.value;
        this.setState({
            value,
        }, () => {
            this.checkSelection()
        })
    }

    checkSelection() {
        // GET RANGES FROM BACKEND SERVER
        const {x1, x2, y1, y2} = this.state.charsCoords[this.state.value];
        
        if((x1 < this.state.clickedX && this.state.clickedX < x2) &&
            (y1 < this.state.clickedY && this.state.clickedY < y2)) {
                console.log('correct selection!')
                this.setState({
                    charsRemaining: this.state.charsRemaining.filter((char) => char !== this.state.value),
                    charsFound: [...this.state.charsFound, this.state.value],
                })
        } else {
            // Popup incorrect message
            console.log('incorrect, boo')
        }
        this.setState({
            popupActive: false,
            clickedX: null,
            clickedY: null,
            value: 'select'
        })
    }

    timer() {
        this.setState({
            timeElapsed: Date.now() - this.state.timeStart,
        }) 
    }

    componentDidUpdate() {
        if (this.state.charsRemaining.length === 0 && this.state.won === false) {
            // Player Won
            console.log('congrats, you won!')
            clearInterval(this.timerID)
            this.setState({
                won: true,
            })

        }
    }

    async componentDidMount () {
        const data = await firebaseData('image-data');
        const chars = data[this.imgName];
        this.setState({
            charsRemaining: Object.keys(chars),
            charsCoords: chars,
            timeStart: Date.now(),
        })
        this.timerID = setInterval(() => this.timer(), 1000)
    }

    render() {
        const x = this.state.clickedX;
        const y = this.state.clickedY;

        return (
            <div>
                <div className='infoBoard'>
                    <div className='chars'>
                        <h4>Remaining: {this.state.charsRemaining.map(char => char + ' ')}</h4>
                        <h4>Found: {this.state.charsFound.map(char => char + ' ')}</h4>
                    </div>
                    <div id='timer'>
                        <h3>Time Elapsed: {formatTime(this.state.timeElapsed)}</h3>
                    </div>
                    {this.state.won &&
                        <div id='winnerPopup' className='flash'>
                            Congrats, you found 'em!
                        </div>
                    }
                    <div id='highscores'>
                        <Highscores 
                            imgName={this.imgName}
                            won={this.state.won}
                            score={this.state.timeElapsed}
                        /> 
                    </div>
                </div> 
                <div className='container'>
                    <img src={this.imgSrc} onClick={this.clicked} className={(this.state.won)? 'spin':null}/>
                    {this.state.popupActive 
                        && <Popup 
                                x={x} 
                                y={y} 
                                value={this.state.value}
                                charsRemaining={this.state.charsRemaining}
                                selection={this.selection}
                            />
                    }
                    <div>
                        {this.state.charsFound.map(char => {
                            const {x1, x2, y1, y2} = this.state.charsCoords[char];
                            const width = x2 - x1;
                            const height = y2 - y1
                            return (
                                <div 
                                className='foundBox'
                                key={char}
                                style={
                                    {
                                        width: width,
                                        height: height,
                                        top: y1 - (height / 4),
                                        left: x1 - (width / 4),
                                        position: 'absolute',
                                    }
                                }>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

class Choice extends React.Component {
    constructor(props){
        super(props)
        this.choices = {
            waldo: {
                title: 'Socially Distanced Waldo',
                imgName: 'waldo-social-distance',
                imgSource: WaldoDistance,
            },
            futurama: {
                title: 'Futurama',
                imgName: 'futurama',
                imgSource: Futurama,
            }
        }
        this.state = {
            choice: null,
        };
        this.makeChoice = this.makeChoice.bind(this);
    }

    makeChoice(e) {
        this.setState({
            choice: this.choices[e.target.value]
        })
    }


    render() {

        return (
            <div className='head'>
                <div id='title'>
                    <h2>Let's Find {this.state.choice && this.state.choice.title}!</h2>
                </div>
                {this.state.choice 
                    && <Game choice={this.state.choice}/>
                    ||  <div className='choice Btn'>
                            <button type='submit' value='waldo' onClick={this.makeChoice}>Waldo</button>
                            <button type='submit' value='futurama' onClick={this.makeChoice}>Futurama</button>
                        </div>
                }
            </div>
        )
    }
}


ReactDOM.render(<Choice />, document.querySelector("#root"));