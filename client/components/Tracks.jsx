import * as _ from 'lodash';
import * as React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Tracks() {
    const [tracks, setTracks] = useState([]);
    const [trackArt, setTrackArt] = useState([]);

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/tracks`

      function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      const myCookies = getCookie('accToken');

    useEffect(() => {
        axios({
            method: 'get',
            url: apiURL,
            withCredentials: false,
            params: {
              access_token: myCookies,
            },
          }).then((res) => {
            console.log(res.data);
            const myTracks = [];
            const myTrackArt = [];

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

            setTrackArt(myTrackArt);
            setTracks(myTracks);
          })
    },[tracks, trackArt])
    return (
        <div>
            <div>
              {tracks}
            </div>
            <div>
              {trackArt}
            </div>
        </div>
    )
}

export default Tracks;