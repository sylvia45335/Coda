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
    const [trackDisplay, setTrackDisplay] = useState(true);
    const [artistDisplay, setArtistDisplay] = useState(false);
    const [genreDisplay, setGenreDisplay] = useState(false);

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

    function trackButton() {
        setTrackDisplay(true);
        setArtistDisplay(false);
        setGenreDisplay(false);
    }

    function artistButton() {
        setTrackDisplay(false);
        setArtistDisplay(true);
        setGenreDisplay(false);
    }

    function genreButton() {
        setTrackDisplay(false);
        setArtistDisplay(false);
        setGenreDisplay(true);
    }

    return (
        <div>
            <h1 className="header">Welcome, {user}!</h1>
            <div className="carouselIndicator">
                <button className="trackButton" onClick={trackButton} style={trackDisplay === true ? {opacity: '100%'} : {opacity: '30%'}}/>
                <button className="artistButton" onClick={artistButton} style={artistDisplay === true ? {opacity: '100%'} : {opacity: '30%'}}/>
                <button className="genreButton" onClick={genreButton} style={genreDisplay === true ? {opacity: '100%'} : {opacity: '30%'}}/>
            </div>
            <div className="container">
                <div style={trackDisplay === true ? {visibility: 'visible'} : {visibility: 'hidden'}} className="trackHome">
                    <div className="trackCard">
                        <h2>Top Tracks</h2>
                        <Tracks className="trackCardContent"/>
                    </div>
                </div>
                <div style={artistDisplay === true ? {visibility: 'visible'} : {visibility: 'hidden'}} className="artistHome">
                    <div className="artistCard">
                        <h2>Top Artists</h2>
                        <Artists />
                    </div>
                </div>
                <div style={genreDisplay === true ? {visibility: 'visible'} : {visibility: 'hidden'}} className="genreHome">
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