import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Artists from './components/Artists.jsx';
import Tracks from './components/Tracks.jsx';
import Genres from './components/Genres.jsx';
import myCookies from './cookiesfunc.js';

function Home() {
    const [user, setUser] = useState('');

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/profile`

    useEffect(() => {
        axios({
            method: 'get',
            url: apiURL,
            withCredentials: false,
            headers: {
                Authorization: myCookies
            },
          }).then((res) => {
            setUser(res.data['display_name']);
          })
    },[])
    return (
        <div>
            Welcome, {user}!
            <div>
              <Artists />
            </div>
            <div>
              <Tracks />
            </div>
            <div>
              <Genres />
            </div>
        </div>
    )
};

export default Home;