require('dotenv').config();
const PORT = process.env.PORT || 3002;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_KEY = process.env.SECRET_KEY;
//set falsey alternatives just in case
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${PORT}/home`;

//object is used for authentication alone
//separate SpotifyWebApis for the actual API calls with access tokens
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyAuthAPI = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    redirectUri: REDIRECT_URI
});

//setting up server
const express = require('express');
const app = express();
const cors = require('cors');

//cookies
const cookieParser = require("cookie-parser");

//for pathing
const path = require('path');

//json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//for cors header if making calls to backend api
app.use(cors());

//configure middleware and static pages here
app.use(express.static(path.join(__dirname, '../client/public')));

//routes
//leads the user to the Spotify page for the user to enter their login credentials
app.get('/login', (req, res) => {
    //recommended to adding a state variable to avoid cross site attacks
    //generate a random string of letters and numbers
    const generateRandomString = (length) => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < length; i++) {
            //gets a random character in our possible string
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    const stateString = generateRandomString(16);
    //add random string to user's cookies and query string
    res.cookie("authState", stateString);

    //ask Spotify for an authorization code filled with a set of permissions called Scopes
    //allows our application to legally make requests to Spotify's API with the user's allowance in mind

    //user-top-read is for user's Top Tracks and Albums
    const scopes = ["user-top-read"];
    //spotify node api method that creates a link that leads to the Spotify Account Login page with a set of requested scopes
    //second param is state and is optional
        //state we pass will be returned from Spotify
        //check against the user's cookies to make sure it matches, no match = boot them out
    const loginLink = spotifyAuthAPI.createAuthorizeURL(scopes, stateString);

    //send user to Spotify Account Login
    res.redirect(loginLink);
});

app.get('/home', (req, res) => {});

const accTokenRefresh = (req, res, next) => {};

app.get('/faves', (req, res) => {});

console.log('authTest running on port' + PORT);
app.listen(PORT);
