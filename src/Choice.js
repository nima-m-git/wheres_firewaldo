import React from "react";

import { Game } from './Game';

import WaldoDistance from './assets/waldo-social-distance.jpg';
import Futurama from './assets/futurama.png';

class Choice extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            choice: null,
        };
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
        this.makeChoice = this.makeChoice.bind(this);
    }

    makeChoice(e) {
        this.setState({
            choice: this.choices[e.target.value],
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='header'>
                    <h2>Let's Find</h2>
                    {this.state.choice &&
                        <div>
                            <h3>{this.state.choice.title}</h3>
                            <div className='backButton'>
                                <button onClick={() => window.location.reload()}>Back</button>
                            </div>
                        </div> 
                    }
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

export { Choice }