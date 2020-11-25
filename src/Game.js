import React from "react";

import { Popup } from './Popup';
import { Highscores } from './Highscores';

import { formatTime } from './format-time';
import { firebaseData } from './firebase-data';
import { clickCoords } from './clicked-coords';

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
            value: 'chek',
            won: false,
            timeStart: null,
            timeElapsed: null,
            click: {},
        }
        this.clicked = this.clicked.bind(this)
        this.selection = this.selection.bind(this)
    }

    clicked(e) {
        const { imgX, imgY, screenX, screenY, } = clickCoords(e);

        console.log({ imgX, imgY, });

        this.setState({
            popupActive: (this.state.popupActive)? false : true,
            click: {
                imgX,
                imgY,
                screenX,
                screenY,
            }
        });
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
        
        if((x1 < this.state.click.imgX && this.state.click.imgX < x2) &&
            (y1 < this.state.click.imgY && this.state.click.imgY < y2)) {

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
            click: {},
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
                <div className='gameboard'>
                    <div className='gameImage'>
                        <img src={this.imgSrc} onClick={this.clicked} className={(this.state.won)? 'spin':null}/>
                        <div>
                            {this.state.charsFound.map(char => {
                                const {x1, x2, y1, y2} = this.state.charsCoords[char];
                                const width = x2 - x1;
                                const height = y2 - y1;
                                return (
                                    <div 
                                    className='foundBox'
                                    key={char}
                                    style={
                                        {
                                            width: width,
                                            height: height,
                                            top: y1,
                                            left: x1,
                                            position: 'absolute',
                                        }
                                    }>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {this.state.popupActive 
                        && <Popup 
                                x={this.state.click.screenX} 
                                y={this.state.click.screenY} 
                                value={this.state.value}
                                charsRemaining={this.state.charsRemaining}
                                selection={this.selection}
                            />
                    }
                </div>
            </div>
        )
    }
}

export { Game }