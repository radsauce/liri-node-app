console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// spotify API
// var Spotify = require('node-spotify-api');
 
// var spotify = new Spotify({
//   id: SPOTIFY_ID,
//   secret: SPOTIFY_SECRET,
// });
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });

// //OMDB API
// var OMDB = require('node-omdb-api')
// var omdb = new OMDB({
//   id: '8fd517c8',
// })