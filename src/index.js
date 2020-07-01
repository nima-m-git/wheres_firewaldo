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
            charsRemaining: ['waldo', 'wenda'],
            charsFound: [],
            popupActive: false,
            clickedX: null,
            clickedY: null,
            value: 'chek'
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

    async selection(e) {
        const value = e.target.value;
        await this.setState({
            value,
        })
        this.checkSelection()
    }

    async checkSelection() {
        // GET RANGES FROM BACKEND SERVER
        console.log('pre await')
        await charCoords('waldo-social-distance', this.state.value);
        console.log('happening?')

        // if((x1 < this.state.clickedX && this.state.clickedX < x2) &&
        //     (y1 < this.state.clickedY && this.state.clickedY < y2)) {
        //         // Add mark/box over correct selection
        //         this.setState({
        //             charsRemaining: this.state.charsRemaining.filter((char) => char !== this.state.value),
        //             charsFound: [...this.state.charsFound, this.state.value],
        //         })
        // } else {
        //     // Popup incorrect message
        // }
        this.setState({
            popupActive: false,
            clickedX: null,
            clickedY: null,
            value: 'select'
        })
    }

    render() {
        return (
            <div>
                <div>Let's Find Waldo!</div>
                <div id='board'></div>
                <img
                    id='wheres' 
                    src={WaldoDistance}
                    onClick={this.clicked} 
                />
                {this.state.popupActive && 
                    <div 
                        className='popup'
                        style={
                            {
                                top: this.state.clickedY,
                                left: this.state.clickedX,
                            }
                        } 
                    >
                        <select value={this.state.value} onChange={this.selection}>
                            <option value='select' key='select'></option>
                            {this.state.charsRemaining.map((char) => <option value={char} key={char}>{char}</option>)}
                        </select>
                    </div>
                }
            </div>
        )
    }

}

ReactDOM.render(<Game />, document.querySelector("#root"));