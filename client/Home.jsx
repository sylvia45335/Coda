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
    const [dataBody, setDataBody] = useState('short_term');

    const [shortButton, setShortButton] = useState(true);
    const [mediumButton, setMediumButton] = useState(false);
    const [longButton, setLongButton] = useState(false);
    
    const [trackDisplay, setTrackDisplay] = useState(true);
    const [artistDisplay, setArtistDisplay] = useState(false);
    const [genreDisplay, setGenreDisplay] = useState(false);

    const [tracks, setTracks] = useState([]);
    const [trackArt, setTrackArt] = useState([]);
    const [trackImg, setTrackImg] = useState([]);

    const [artists, setArtists] = useState([]);
    const [artistImg, setArtistImg] = useState([]);

    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);

    const PORT = process.env.REACT_APP_PORT;
    const profileURL = `http://localhost:${PORT}/api/profile`;
    const trackURL = `http://localhost:${PORT}/api/tracks`;
    const artistURL = `http://localhost:${PORT}/api/artists`;

    useEffect(() => {
        axios({
            method: 'get',
            url: profileURL,
            withCredentials: false,
            headers: {
                Authorization: myCookies
            },
          }).then((res) => {
            setUser(res.data['display_name']);
          }).catch((err) => console.log(err));
    },[]);

    useEffect(() => {
        axios.get(trackURL, {
            params: {
                term: dataBody
            }
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
    },[dataBody]);

    useEffect(() => {
        axios.get(artistURL, {
            params: {
                term: dataBody
            }
        }).then((res) => {
            // console.log(res.data);
            const artList = [];
            const myArtImg = [];

            for(let i = 0; i < res.data.length; i++) {
                artList.push(res.data[i].name);
            }

            for(let i = 0; i < res.data.length; i++) {
                myArtImg.push(res.data[i].images[0].url);
            }

            const poll = {};

            for(let i = 0; i < res.data.length; i++) {
                for(let j = 0; j < res.data[i].genres.length; j++) {
                    if(res.data[i].genres[j] in poll) {
                        poll[res.data[i].genres[j]] = poll[res.data[i].genres[j]] + 1;
                    } else {
                        poll[res.data[i].genres[j]] = 1;
                    }
                }
            }


            // console.log(poll);
            const labelSorted = Object.keys(poll).sort((a, b) => poll[b] - [a]);
            // console.log(labelSorted);
            const dataSorted = Object.values(poll).sort((a, b) => b-a);
            // console.log(dataSorted);
            const topLabels = [];
            const topData = [];
            for(let i = 0; i < 5; i++) {
                topLabels.push(labelSorted[i]);
                topData.push(dataSorted[i]);
            }

            // console.log(topLabels, topData);
            setLabel(topLabels);
            setData(topData);


            setArtistImg(myArtImg);
            setArtists(artList);
          }).catch((err) => console.log(err));
    },[dataBody]);

    function trackButton() {
        setTrackDisplay(true);
        setArtistDisplay(false);
        setGenreDisplay(false);

        const element = document.getElementById('insideTrack');
        element.classList.add('transition');
        setTimeout(function(){element.classList.remove('transition');}, 1000);
    }

    function artistButton() {
        setTrackDisplay(false);
        setArtistDisplay(true);
        setGenreDisplay(false);

        const element = document.getElementById('insideArtist');
        element.classList.add('transition');
        setTimeout(function(){element.classList.remove('transition');}, 1000);
    }

    function genreButton() {
        setTrackDisplay(false);
        setArtistDisplay(false);
        setGenreDisplay(true);

        const element = document.getElementById('insideGenre');
        element.classList.add('transition');
        setTimeout(function(){element.classList.remove('transition');}, 1000);
    }

    function short() {
        setDataBody('short_term');
        setShortButton(true);
        setMediumButton(false);
        setLongButton(false);


        if(shortButton === false && trackDisplay === true) {
          const element = document.getElementById('trackList');
          element.classList.add('transition');
          setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
        if(shortButton === false && artistDisplay === true) {
            const element = document.getElementById('artistList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
        if(shortButton === false && genreDisplay === true) {
            const element = document.getElementById('genreList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
    }

    function medium() {
        setDataBody('medium_term');
        setShortButton(false);
        setMediumButton(true);
        setLongButton(false);

        if(mediumButton === false && trackDisplay === true) {
            const element = document.getElementById('trackList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
        if(mediumButton === false && artistDisplay === true) {
            const element = document.getElementById('artistList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
        if(mediumButton === false && genreDisplay === true) {
            const element = document.getElementById('genreList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
    }

    function long() {
        setDataBody('long_term');
        setShortButton(false);
        setMediumButton(false);
        setLongButton(true);

        if(longButton === false && trackDisplay === true) {
            const element = document.getElementById('trackList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
        if(longButton === false && artistDisplay === true) {
            const element = document.getElementById('artistList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
        if(longButton === false && genreDisplay === true) {
            const element = document.getElementById('genreList');
            element.classList.add('transition');
            setTimeout(function(){element.classList.remove('transition');}, 1000);
        }
    }


    return (
        <div>
            <div className="topData">
                <div className="headerContainer">
                    <h1 className="header">Welcome, {user}!</h1>
                </div>
                <div className="buttonData">
                    <button className="dataButton" onClick={short} style={shortButton === true ? {opacity: '100%'} : {opacity: '30%'}}>Last Month</button>
                    <button className="dataButton" onClick={medium} style={mediumButton === true ? {opacity: '100%'} : {opacity: '30%'}}>Last 6 Months</button>
                    <button className="dataButton" onClick={long} style={longButton === true ? {opacity: '100%'} : {opacity: '30%'}}>Last Few Years</button>
                </div>
            </div>
            <div className="carouselIndicator">
                <button className="trackButton" onClick={trackButton} style={trackDisplay === true ? {opacity: '100%'} : {opacity: '30%'}}/>
                <button className="artistButton" onClick={artistButton} style={artistDisplay === true ? {opacity: '100%'} : {opacity: '30%'}}/>
                <button className="genreButton" onClick={genreButton} style={genreDisplay === true ? {opacity: '100%'} : {opacity: '30%'}}/>
            </div>
            <div className="container">
                <div style={trackDisplay === true ? {visibility: 'visible'} : {visibility: 'hidden'}} className="trackHome" id="track">
                    <div className="trackCard" id="insideTrack">
                        <h2>Top Tracks</h2>
                        <Tracks tracks={tracks} trackArt={trackArt} trackImg={trackImg} id="trackList"/>
                    </div>
                </div>
                <div style={artistDisplay === true ? {visibility: 'visible'} : {visibility: 'hidden'}} className="artistHome" id="artist">
                    <div className="artistCard" id="insideArtist">
                        <h2>Top Artists</h2>
                        <Artists artists={artists} artistImg={artistImg} id="artistList"/>
                    </div>
                </div>
                <div style={genreDisplay === true ? {visibility: 'visible'} : {visibility: 'hidden'}} className="genreHome" id="genre">
                    <div className="genreCard" id="insideGenre">
                        <h2>Top Genres</h2>
                        <Genres label={label} data={data} id="genreList"/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;