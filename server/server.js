require('dotenv').config();
const PORT = process.env.PORT || 3002;
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_KEY = process.env.SECRET_KEY;
//set falsey alternatives just in case
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${PORT}/home`;

//separate SpotifyWebApis for the actual API calls with access tokens
const SpotifyWebApi = require("spotify-web-api-node");
//object is used for authentication alone
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
    //user-read-email & user-read-private is for user's profile to get display name
    const scopes = ["user-top-read", "user-read-private", "user-read-email"];
    //spotify node api method that creates a link that leads to the Spotify Account Login page with a set of requested scopes
    //second param is state and is optional
        //state we pass will be returned from Spotify
        //check against the user's cookies to make sure it matches, no match = boot them out
    const loginLink = spotifyAuthAPI.createAuthorizeURL(scopes, stateString);

    //send user to Spotify Account Login
    res.redirect(loginLink);
});

//middleware to check user's cookies for an access token
//no access token, then it asks Spotify for a new access token using a refresh token
//if no refresh token -> login page
const accTokenRefresh = (req, res, next) => {
    if (req.cookies.accToken) return next();
    else if (req.cookies.refToken) {
        spotifyAuthAPI.setRefreshToken(refresh_token);
        spotifyAuthAPI.refreshAccessToken()
          .then((data) => {
            spotifyAuthAPI.resetRefreshToken();

            //get new access token from our server
            const newAccToken = data.body["access_token"];
            //set it into cookies with new expiration timer
            res.cookie("accToken", newAccToken, {
                maxAge: data.body["expires_in"] * 1000,
            });

            return next();
          });
    } else {
        return res.redirect('/login');
    }
};

app.get('/home', (req, res) => {
    //check state against the user's cookies and send them away if it doesn't match
    //access authentication code and state variable through req.query
    if(req.query.state !== req.cookies.authState) {
        return res.redirect("/login");
    }

    res.clearCookie("authState");

    //turn the authentication code into access and refresh tokens
    const authenticationCode = req.query.code;
    if (authenticationCode) {
        //authorizationCodeGrant returns a promise that yields th tokens
        //placed in cookies
        spotifyAuthAPI.authorizationCodeGrant(authenticationCode).then((data) => {
            res.cookie("accToken", data.body["access_token"], {
                maxAge: data.body["expires_in"] * 1000,
            });
            res.cookie("refToken", data.body["refresh_token"]);

            //use access token
            return res.status(200).send(`<pre>${JSON.stringify(data.body, null, 2)}</pre>`);
        })
    }
});

//get Top Tracks and Artists
app.get('/tracks', accTokenRefresh, (req, res) => {
    const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies.accToken });

    let count = 20;

    spotifyAPI
      .getMyTopTracks({ limit: count, time_range: "short_term" })
      .then((data) => {
        return res.status(200).send(`<pre>${JSON.stringify(data.body.items, null, 2)}</pre>`);
      });
});

app.get('/artists', accTokenRefresh, (req, res) => {
    const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies.accToken });

    let count = 20;

    spotifyAPI
      .getMyTopArtists({ limit: count, time_range: "short_term" })
      .then((data) => {
        return res.status(200).send(`<pre>${JSON.stringify(data.body.items, null, 2)}</pre>`);
      });
});

app.get('/profile', accTokenRefresh, (req, res) => {
    const spotifyAPI = new SpotifyWebApi({ accessToken: req.cookies.accToken });

    spotifyAPI
      .getMe()
      .then((data) => {
        return res.status(200).send(`<pre>${JSON.stringify(data.body, null, 2)}</pre>`);
      })
});

//global error handling
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express global error handler caught unknown error',
        status: 400,
        message: { err: 'An unknown error occurred'}
    };

    const errObj = Object.assign(defaultErr, err);
    res.status(errObj.status).send(JSON.stringify(errObj.message));
});

console.log('authTest running on port' + PORT);
app.listen(PORT);
