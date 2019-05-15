require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const cmd = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

function goLiri(command, userIn){
  switch (command) {
    case "concert-this":
      concertThis(userIn);
      break;
    case "spotify-this-song":
      spotifyThis(userIn);
      break;
    case "movie-this":
      movieThis(userIn);
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "utf8", function(error, data) {
        const dataArr = data.split(",");
        goLiri(dataArr[0], dataArr[1].replace(/['"]+/g, ''));
      });
      break;
  }
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
      ===================================================================================
      Venue Name: ${response.data[i].venue.name}
      Location:   ${response.data[i].venue.city}, ${
          response.data[i].venue.region
        }, ${response.data[i].venue.country}
      Date:       ${moment(response.data[i].venue.datetime).format(
        "MM/DD/YYYY"
      )}
      ===================================================================================`);
      }
    })
    .catch(function(error) {
      if (error) {
        console.log(`
        ===================================================================================
        Sorry I could not find that.
        Error message: ${error}
        ===================================================================================`);
      }
    });
}

function spotifyThis(track) {
  // if user input is blank then default to this
  if (track == "") {
    track = "the sign ace of base";
  }
  spotify.search({ type: "track", query: track }, function(err, data) {
    if (err) {
      return console.log(`
      ===================================================================================
      Sorry I could not find that.
      Error message: ${err}
      ===================================================================================`);
    }
    console.log(`
    ===================================================================================
    Artist:       ${data.tracks.items[0].artists[0].name}
    Song Name:    ${data.tracks.items[0].name}
    Preview Link: ${data.tracks.items[0].href}
    Album Title:  ${data.tracks.items[0].album.name}
    ===================================================================================`);
  });
}

function movieThis(movieName) {
  if (movieName == "") {
    movieName = "Mr. Nobody";
  }
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(`
      ===================================================================================
      Film Title:   ${response.data.Title}
      Year:         ${response.data.Year}
      IMDB Rating:  ${response.data.Ratings[0].Value}
      RT Rating:    ${response.data.Ratings[1].Value}
      Coutry Prod:  ${response.data.Country}
      Language:     ${response.data.Language}
      Plot:         ${response.data.Plot}
      Actors:       ${response.data.Actors}
      ===================================================================================`);
    })
    .catch(function(error) {
      if (error) {
        console.log(`
      ===================================================================================
      Sorry I could not find that.
      Error message: ${error}
      ===================================================================================`);
      }
    });
}
goLiri(cmd, userInput);