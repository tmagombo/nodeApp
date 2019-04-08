
require("dotenv").config();
var moment = require('moment');
moment().format();

var fs = require("fs");

var keys = require("./keys.js");
var cmd=require('node-cmd');

var command = process.argv[2];
var command2 = process.argv[3];

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var spotifyArr = [];
var text = [];

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
  spotify.search({
    type: 'track', limit: '5', query: command2}, function(err, data){
    if(err){
      return console.log("error")
    }
    for(var i = 0; i<5; i++)
    {
          if(data.tracks.items[i].popularity>40){
            spotifyArr.push(data.tracks.items[i]);
          };
        };
        console.log(spotifyArr[0].artists[0].name);
        console.log(spotifyArr[0].name);
        console.log(spotifyArr[0].preview_url);
        console.log(spotifyArr[0].album.name);
        if(spotifyArr[1]!==undefined){
        console.log("\n---------------------------------\n");
        console.log(spotifyArr[1].artists[1].name);
        console.log(spotifyArr[1].name);
        console.log(spotifyArr[1].preview_url);
        console.log(spotifyArr[1].album.name);
        };

    });
};

function whatItSays(){
  fs.readFile("random.txt","utf-8", function(error, data){
    if(error){
        return console.log(error);
    }
    text.push(data.split(","));
    console.log(text);
    movieThisSong();
  })};

function movieThisSong(){
  if(command2!==undefined&&text.arraylength===0){
    command2 = "Mr.Nobody";
  }
  else{
    command2 = text[1];
    console.log("hi")
  };
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

if(command==="do-what-it-says"){
  whatItSays();
};
