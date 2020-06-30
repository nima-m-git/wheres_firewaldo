import React from "react";
import ReactDOM from "react-dom";

import WaldoDistance from './assets/waldo-social-distance.jpg';
import './index.css';


const getCoords = (e) => {
    console.log(
        'client X/Y: ', e.nativeEvent.offsetX, e.nativeEvent.offsetY
    )
}

const App = () => {
  return (
    <div>
        <div>Let's Find Waldo!</div>
        <img
            id='wheres' 
            src={WaldoDistance}
            onClick={getCoords} 
        />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));