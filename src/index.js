import React from "react";
import ReactDOM from "react-dom";

import WaldoDistance from './assets/waldo-social-distance.jpg';
import Futurama from './assets/futurama.png';

import './index.module.css';
import { firebaseData } from './retrieve-image-data';
import { clickCoords } from './clicked-coords';


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
        this.state = {
            charsRemaining: [],
            charsFound: [],
            charsCoords: {},
            popupActive: false,
            clickedX: null,
            clickedY: null,
            value: 'chek',
            won: false
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
                // Add mark/box over correct selection
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

    componentDidUpdate() {
        if (this.state.charsRemaining.length === 0 && this.state.won === false) {
            this.setState({
                won: true,
            })
            // Player Won
            console.log('congrats, you won!')
        }
    }

    async componentDidMount () {
        const data = await firebaseData();
        const chars = data[0]['futurama'];
        this.setState({
            charsRemaining: Object.keys(chars),
            charsCoords: chars,
        })
    }

    render() {
        const x = this.state.clickedX;
        const y = this.state.clickedY;
        return (
            <div>
                <h2>Let's Find Waldo!</h2>
                <div className='infoBoard'>
                    <h4>Remaining: {this.state.charsRemaining.map(char => char + ' ')}</h4>
                    <h4>Found: {this.state.charsFound.map(char => char + ' ')}</h4>
                </div> 
                <div className='container'>
                    <img src={Futurama} onClick={this.clicked} />
                    {this.state.popupActive 
                        && <Popup 
                                x={this.state.clickedX} 
                                y={this.state.clickedY} 
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

ReactDOM.render(<Game />, document.querySelector("#root"));