import * as _ from 'lodash';
import * as React from "react";

function Artists({ artists, artistImg }) {

    return(
        <div className="artistContainer">
            <ul>
            {artists.map((x, index) => (<li key={index}> #{[index + 1]} <img src={artistImg[index]}></img>{artists[index]}</li>))}
            </ul>
        </div>
    )
}

export default Artists;