import * as _ from 'lodash';
import * as React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Artists from './components/Artists.jsx';
import Tracks from './components/Tracks.jsx';
import Genres from './components/Genres.jsx';
import myCookies from './cookies.js';

function Home() {
    const [user, setUser] = useState('');

    const PORT = process.env.REACT_APP_PORT;
    const apiURL = `http://localhost:${PORT}/api/profile`;

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
          }).catch((err) => console.log(err));
    },[])

    return (
        <div>
            <h1 className="header">Welcome, {user}!</h1>
            <div className="container">
                <div>
                    <div className="trackCard">
                        <h2>Top Tracks</h2>
                        <Tracks className="trackCardContent"/>
                    </div>
                </div>
                <div>
                    <div className="artistCard">
                        <h2>Top Artists</h2>
                        <Artists />
                    </div>
                </div>
                <div>
                    <div className="genreCard">
                        <h2>Top Genres</h2>
                        <Genres />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;