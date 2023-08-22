import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import myCookies from '../cookiesfunc.js';

function Artists() {
    const [artists, setArtists] = useState([]);

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/artists`


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
            const artList = [];

            for(let i = 0; i < res.data.length; i++) {
                artList.push(res.data[i].name);
            }
            
            setArtists(artList);
          }, [])
    })
    return(
        <div>
            {artists}
        </div>
    )
}

export default Artists;