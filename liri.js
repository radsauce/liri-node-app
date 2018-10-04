const request = require('request')
require("dotenv").config();
const keys = require('./keys.js')
const fs = require('fs')
const inq = require('inquirer')


//Spotify Search
const spotify = song => {
    var reqSpotify = require('node-spotify-api');
    var spotify = new reqSpotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: song,
    }, (e, d) => {
        if (e) {console.log('An error has occurred!' + e)}
        const data = `
        Search Results:
        --- --- --- ---
        Artist: ${d.tracks.items[0].artists[0].name}
        Title: ${d.tracks.items[0].name}
        Album: ${d.tracks.items[0].album.name}
        --- --- --- ---
        --- --- --- ---
        Artist: ${d.tracks.items[1].artists[0].name}
        Title: ${d.tracks.items[1].name}
        Album: ${d.tracks.items[1].album.name}
        --- --- --- ---
        --- --- --- ---
        Artist: ${d.tracks.items[2].artists[0].name}
        Title: ${d.tracks.items[2].name}
        Album: ${d.tracks.items[2].album.name}
        --- --- --- ---
        `
        console.log(d)

        fs.appendFile('random.txt', d, e => {
            if (e) {console.log(e)}
        })
    })
}

//Run application
const runApp = () => {
    if (process.argv[2] === 'init') {
        inq.prompt([
            {type: 'list',
            message: 'Choose which media type to search for!',
            name: 'userChoice',
            choices: ['Song Search...', "Band's Next Show...", 'Movie Search...']}
        ])
        .then(r => choice(r.userChoice))
    }
    console.log('Woo')
}
runApp()
