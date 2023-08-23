import * as _ from 'lodash';
import * as React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import myCookies from '../cookies.js';
import SpotifyWebApi from 'spotify-web-api-node';

function Artists() {
    const [artists, setArtists] = useState([]);

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/artists`;

    useEffect(() => {
        axios({
            method: 'get',
            url: apiURL,
            withCredentials: false,
            headers: {
                Authorization: myCookies
            },
          }).then((res) => {
            console.log(res.data);
            const artList = [];
            for(let i = 0; i < res.data.length; i++) {
                artList.push(res.data[i].name);
            }
            setArtists(artList);
          }).catch((err) => console.log(err));
    },[]);

    return(
        <div>
            {artists}
        </div>
    )
}

export default Artists;