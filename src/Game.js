import React from "react";

import { InfoBoard } from './InfoBoard';
import { GameBoard } from './GameBoard';
import { firebaseData } from './firebase-data';


class Game extends React.Component {
    constructor(props) {
        super(props)
        
        this.imgName = this.props.choice.imgName;
        this.imgSrc = this.props.choice.imgSource;

        this.state = {
            charsRemaining: [],
            charsFound: [],
            charsCoords: {},
            won: false,
            timeStart: null,
            timeElapsed: null,
            click: {},
            selectedChar: null,
        }
        this.checkSelection = this.checkSelection.bind(this);
        this.setClickCoords = this.setClickCoords.bind(this);
    }

    setClickCoords({ imgX, imgY, }) {
        this.setState({
            click: {
                imgX,
                imgY,
            }
        })
    }

    checkSelection(char) {
        // GET RANGES FROM BACKEND SERVER
        console.log(char);
        const {x1, x2, y1, y2} = this.state.charsCoords[char];

        // Check if clicked coords within selected char range
        if((x1 < this.state.click.imgX && this.state.click.imgX < x2) &&
            (y1 < this.state.click.imgY && this.state.click.imgY < y2)) {

                console.log('correct selection!')
                this.setState({
                    charsRemaining: this.state.charsRemaining.filter((char) => char !== char),
                    charsFound: [...this.state.charsFound, char],
                })
        } else {
            // Popup incorrect message
            console.log('incorrect, boo');
        }
        this.setState({
            click: {},
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
        return (
            <div>
                <InfoBoard 
                    charsRemaining={this.state.charsRemaining}
                    charsFound={this.state.charsFound}
                    timeElapsed={this.state.timeElapsed}
                    imgName={this.imgName}
                    won={this.state.won}
                    score={this.timeElapsed}
                />
                <GameBoard 
                    checkSelection={this.checkSelection}
                    won={this.state.won}
                    imgSrc={this.imgSrc}

                    charsFound={this.state.charsFound}
                    charsCoords={this.state.charsCoords}
                    charsRemaining={this.state.charsRemaining}

                    setClickCoords={this.setClickCoords}
                />
            </div>
        )
    }
}

export { Game }