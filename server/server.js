require('dotenv').config({path:__dirname+'./.env'});
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
app.use(express.static(path.join(__dirname, '../client/static')));

//routes
app.get('/login', (req, res) => {});

app.get('/home', (req, res) => {});

const accTokenRefresh = (req, res, next) => {};

app.get('/faves', (req, res) => {});

console.log('authTest running on port' + PORT);
app.listen(PORT);
