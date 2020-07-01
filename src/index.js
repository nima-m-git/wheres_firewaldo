import React from "react";
import ReactDOM from "react-dom";

import WaldoDistance from './assets/waldo-social-distance.jpg';
import './index.css';
import { charCoords } from './retrieve-image-data'


const clickCoords = (e) => {
    return {
        clickedX: e.nativeEvent.offsetX,
        clickedY: e.nativeEvent.offsetY
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            charsRemaining: ['waldo'],
            charsFound: [],
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
            popupActive: true,
            clickedX,
            clickedY,
        })
    }

    selection(e) {
        const value = e.target.value;
        this.setState({
            value,
        }, () => {
            this.checkSelection().catch(error => {
                console.log({error,})
            })
        })
    }

    async checkSelection() {
        // GET RANGES FROM BACKEND SERVER
        const {x1, x2, y1, y2} = await charCoords('waldo-social-distance', this.state.value);
        
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

    render() {
        const x = this.state.clickedX;
        const y = this.state.clickedY;

        return (
            <div>
                <h2>Let's Find Waldo!</h2>
                <div id='board'></div>
                <div className='container'>
                    <img
                        src={WaldoDistance}
                        onClick={this.clicked} 
                    />
                    {this.state.popupActive &&
                        <div className='selections'>
                            <div 
                                className='selectionMenu'
                                style={
                                    {
                                        top: y,
                                        left: x - 20,
                                        position: 'absolute'
                                    }
                                } 
                            >
                                <select value={this.state.value} onChange={this.selection}>
                                    <option value='select' key='select'></option>
                                    {this.state.charsRemaining.map((char) => <option value={char} key={char}>{char}</option>)}
                                </select>
                            </div>
                            <div
                                className='selectionBox'
                                style={
                                    {
                                        top: y + 20,
                                        left: x - 20,
                                        height: 120,
                                        width: 60,
                                        border: '1px dashed black',
                                        position: 'absolute'
                                    }
                                }
                            >
                            </div>
                        </div> 

                    }
                </div>
            </div>
        )
    }

}

ReactDOM.render(<Game />, document.querySelector("#root"));