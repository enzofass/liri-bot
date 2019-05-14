require("dotenv").config();
const axios = require("axios");
const moment = require("moment");

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const cmd = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

switch (cmd) {
  case "concert-this":
    console.log("inside concert-this");
    concertThis(userInput);
    break;
  case "spotify-this-song":
    console.log("inside spotify-this-song");
    spotifyThis(userInput);
    break;
  case "movie-this":
    console.log("inside movie-this");
    movieThis(userInput);
    break;
  case "do-what-it-says":
    console.log("inside do-what-it-says");
    break;
}

// cmd concertThis -> Band in Town API 
function concertThis(artist) {
  const queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(`***** concert-this results for: ${artist} *****`);
      for (let i = 0; i < response.data.length; i++) {
        console.log(`
      =====================
      Venue Name: ${response.data[i].venue.name}
      Location:   ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}
      Date:       ${moment(response.data[i].venue.datetime).format("MM/DD/YYYY")}
      =====================`);
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function spotifyThis(track) {
  // if user input is blank then default to this
  if (track == ""){
    track = "the sign ace of base";
  }
  spotify.search({ type: 'track', query: track }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(`
    =====================
    Artist:       ${data.tracks.items[0].artists[0].name}
    Song Name:    ${data.tracks.items[0].name}
    Preview Link: ${data.tracks.items[0].href}
    Album Title:  ${data.tracks.items[0].album.name}
    =====================`);
  });
}

function movieThis(movieName) {
  if (movieName == ""){
    movieName = "Mr. Nobody";
  }
  // Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(`
      =====================
      Film Title:   ${response.data.Title}
      Year:         ${response.data.Year}
      IMDB Rating:  ${response.data.Ratings[0].Value}
      RT Rating:    ${response.data.Ratings[1].Value}
      Coutry Prod:  ${response.data.Country}
      Language:     ${response.data.Language}
      Plot:         ${response.data.Plot}
      Actors:       ${response.data.Actors}
      =====================`);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}
