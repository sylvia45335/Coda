import * as _ from 'lodash';
import * as React from "react";

function Tracks({ tracks, trackArt, trackImg }) {

    return (
        <div className="tracksContainer">
          <ul className="trackList">
          {tracks.map((x, index) => (<li key={index} className="trackItem">#{[index + 1]} <img src={trackImg[index]}></img>{tracks[index] + ' - ' + trackArt[index]}</li>))}
          </ul>
        </div>
    )
}

export default Tracks;