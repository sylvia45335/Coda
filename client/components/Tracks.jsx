import * as _ from 'lodash';
import * as React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import myCookies from '../cookies.js';

function Tracks() {
    const [tracks, setTracks] = useState([]);
    const [trackArt, setTrackArt] = useState([]);
    const [trackImg, setTrackImg] = useState([]);

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/tracks`;

    useEffect(() => {
        axios({
            method: 'get',
            url: apiURL,
            withCredentials: false,
            headers: {
              Authorization: myCookies
            },
          }).then((res) => {
            // console.log(res.data);
            const myTracks = [];
            const myTrackArt = [];
            const myTrackImg = [];

            for(let i = 0; i < res.data.length; i++) {
                myTracks.push(res.data[i].name);
            }

            for(let i = 0; i < res.data.length; i++) {
                let art = "";
                for(let j = 0; j < res.data[i].artists.length; j++) {
                    if(j > 0) {
                      art += ' & ' + res.data[i].artists[j].name;
                    } else {
                      art += res.data[i].artists[j].name;
                    }
                }
                myTrackArt.push(art);
            }

            for(let i = 0; i < res.data.length; i++) {
              myTrackImg.push(res.data[i].album.images[0].url);
            }

            // console.log(myTrackImg);

            setTrackImg(myTrackImg);
            setTrackArt(myTrackArt);
            setTracks(myTracks);
          }).catch((err) => console.log(err));
    },[]);

    return (
        <div className="tracksContainer">
          <ul className="trackList">
          {tracks.map((x, index) => (<li key={index} className="trackItem">#{[index + 1]} <img src={trackImg[index]}></img>{tracks[index] + ' - ' + trackArt[index]}</li>))}
          </ul>
        </div>
    )
}

export default Tracks;