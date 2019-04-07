
require("dotenv").config();
var moment = require('moment');
moment().format();

var keys = require("./keys.js");

var command = process.argv[2];
var command2 = process.argv[3];

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");



function concertThis(){
  axios.get("https://rest.bandsintown.com/artists/" + command2 + "/events?app_id=codingbootcamp")
.then(function(response) {
  console.log("\n--------------------------\n")
  console.log(command2);
  console.log(response.data[0].venue.name);
  console.log(response.data[0].venue.city+", "+response.data[0].venue.region);
  var time = response.data[0].datetime;
  console.log(moment(time).format('MMMM Do YYYY'));
  });
};

function spotifyThisSong(){
  axios.get("https://accounts.spotify.com/authorize/client_id=bbffe8dab87e4604961299d51bbe98bc"+
  "&response_type=token&redirect_uri=https://mysite.com/callback/")
  .then(function(response) {
    console.log(response);
  });
};

function whatItSays(){
  
}

function movieThisSong(){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+command2)
    .then(function(response){
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Ratings[1].Value);
      console.log(response.data.Ratings[2].Value);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Actors);
      console.log(response.data.Plot);

    });
};

if(command==="concert-this"){
  concertThis();
};

if(command==="spotify-this"){
  spotifyThisSong();
};

if(command==="movie-this"){
  movieThisSong();
};
