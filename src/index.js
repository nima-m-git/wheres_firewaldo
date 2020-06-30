import React from "react";
import ReactDOM from "react-dom";

import WaldoDistance from './assets/waldo-social-distance.jpg';
import './index.css';


const getCoords = (e) => {
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
            value: 'select'
        }
        this.clicked = this.clicked.bind(this)
        this.selection = this.selection.bind(this)
    }

    clicked(e) {
        const {clickedX, clickedY} = getCoords(e)
        this.setState({
            popupActive: true,
            clickedX,
            clickedY,
        })
    }

    selection(e) {
        this.setState({
            value: e.target.value
        })
        this.checkSelection()
    }

    checkSelection() {
        // GET RANGES FROM BACKEND SERVER

        if((x1 < this.state.clickedX && this.state.clickedX < x2) &&
            (y1 < this.state.clickedY && this.state.clickedY < y2)) {
                // Add mark/box over correct selection
                this.setState({
                    charsRemaining: this.state.charsRemaining.filter((char) => char !== this.state.value),
                    charsFound: [...this.state.charsFound, this.state.value],
                })
        } else {
            // Popup incorrect message
        }
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
                    onClick={clicked} 
                />
                {this.state.popup.active && 
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
                            <option value='select'></option>
                            {this.state.charsRemaining.map((char) => <option value={char}>{value}</option>)}
                        </select>
                    </div>
                }
            </div>
        )
    }

}

ReactDOM.render(<Game />, document.querySelector("#root"));