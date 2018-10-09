const request = require('request')
require('dotenv').config();
const keys = require('./keys.js')
const fs = require('fs')
const inq = require('inquirer')
const moment = require('moment')
const omdb = require('omdb')

//Spotify Search
const spotify = song => {
    var reqSpotify = require('node-spotify-api');
    var spotify = new reqSpotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    spotify.search({
        type: 'track',
        query: song,
    }, (e, d) => {
        if (e) {console.log('An error has occurred!' + e)}
        const data = `
        Spotify Search Results:
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
        console.log(data)

        fs.appendFile('log.txt', data, e => {
            if (e) {console.log(e)}
        })
    })
    
}
//Bands In Town Search
const bit = band => {
    var reqBIT = require('moment');
    request(`https://rest.bandsintown.com/artists/${band}/events?app_id=${keys.bit.id}`, (e, r, d) => {
        if (e) { console.log(e) }
        const info = JSON.parse(d)
        const data = `
        ${info[0].lineup[0]}'s Upcoming Show:
        --------------------
        Venue: ${info[0].venue.name}
        Location: ${info[0].venue.city}
        Date: ${moment(info[0].datetime).format('MM/DD/YY')}
        --------------------
        `
        console.log(data)
       fs.appendFile('log.txt', data, e => {
        if (e) { console.log(e) }
        })
    })
}
//Movie Search
const movie = movie => {
    request(`http://www.omdbapi.com/?t=${movie}&apikey=${keys.omdb.id}`, (e, r, d) => {
        if (e) { console.log(e) }
        const movieChoice = JSON.parse(d)
        const data = `
        ${movieChoice.Title} information:
        --------------------
        Title: ${movieChoice.Title}
        Release Year: ${movieChoice.Released}
        Rating: ${movieChoice.Rated}
        Rotten Tomatoes Rating: ${movieChoice.Ratings[1].Value}
        Release Country: ${movieChoice.Country}
        Language: ${movieChoice.Language}
        Plot: ${movieChoice.Plot}
        Actors: ${movieChoice.Actors}
        --------------------
        `
        console.log(data)
       fs.appendFile('log.txt', data, e => {
        if (e) { console.log(e) }
        })
    })
}

// //Inquire selection utilizing a list prompt
// const choice = choice => {
//     switch (choice) {
//         case 'Song Search...':
//         inq.prompt([
//             {
//                 type: 'input',
//                 name: 'songChoice',
//                 message: 'What is the title of the song you would like to find?'
//             }
//         ]).then(answers => spotify(answers.songChoice))
//         break
        
//         case "Band's Next Show...":
//         inq.prompt([
//             {
//                 type: 'input',
//                 name: 'bandChoice',
//                 message: "What band's next tour date would like to find?"
//             }
//         ]).then(answers => bit(answers.bandChoice))
//         break
        
//         case 'Movie Search...':
//         inq.prompt([
//             {
//                 type: 'input',
//                 name: 'movieChoice',
//                 message: 'What movie information would like to find?'
//             }
//         ]).then(answers => movie(answers.movieChoice))
//         break            
//     }
// }
// //Run application
// const runApp = () => {
//     if (process.argv[2] === 'init') {
//         inq.prompt([
//             {type: 'list',
//             name: 'userChoice',
//             message: 'Choose which media type to search for!',
//             choices: ['Song Search...', "Band's Next Show...", 'Movie Search...']}
//         ])
//         .then(answers => choice(answers.userChoice))
//     }
// }

//Inquire selection
const choice = choice => {
    switch (choice) {
        case 'Song Search...':
        inq.prompt([
            {
                type: 'input',
                name: 'songChoice',
                message: 'What is the title of the song you would like to find?'
            }
        ]).then(answers => spotify(answers.songChoice))
        break
        
        case "Band's Next Show...":
        inq.prompt([
            {
                type: 'input',
                name: 'bandChoice',
                message: "What band's next tour date would like to find?"
            }
        ]).then(answers => bit(answers.bandChoice))
        break
        
        case 'Movie Search...':
        inq.prompt([
            {
                type: 'input',
                name: 'movieChoice',
                message: 'What movie information would like to find?'
            }
        ]).then(answers => movie(answers.movieChoice))
        break            
    }
}

//Run application
const runApp = function () {  
    if (process.argv[2] === 'spotify-this-song') {
        spotify(process.argv[3])
    } else if (process.argv[2] === 'concert-this') {
        bit(process.argv[3])
    } else if (process.argv[2] === 'movie-this') {
        movie(process.argv[3])
    } else console.log('Please input a request and parameter: spotify-this-song "song title", concert-this "band name", or movie-this "movie title"')
}

runApp()
