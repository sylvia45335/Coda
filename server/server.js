require("dotenv").config();
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
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

