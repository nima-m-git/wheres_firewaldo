import React from "react";

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
                        <input type='submit' value='Submit' className='submit Btn'/>
                    </form>
                }
            </div>
        )
    }
}

export { EnterScore }