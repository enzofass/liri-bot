# liri-bot
Project Name: LIRI Bot
Description: LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Instructions:
liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

`concert-this` will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

`spotify-this-song` will show the following information about the song in your terminal/bash window:
    * Artist(s),
    * The song's name,
    * A preview link of the song from Spotify,
    * The album that the song is from
    * If no song is provided then your program will default to "The Sign" by Ace of Base.

`movie-this` will output the following information to your terminal/bash window:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    
`do-what-it-says` will take the text inside of random.txt and then use it to call one of LIRI's commands. It should run spotify-this-song for "Gravel Pit" as follows the text in random.txt. Feel free to change the text in that document to test out the feature for other commands.

