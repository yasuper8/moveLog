// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    controllers = require('./controllers');



// MIDDLEWARE

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// parse incoming urlencoded form data
// and populate the req.body object
app.use(bodyParser.urlencoded({
  extended: true
}));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//renders signup and signin pages
// app.set('view engine', 'ejs');


/************
 * DATABASE *
 ************/

var db = require('./models');
var User = require('./models/user');
var Video = require('./models/video');
/**********
 * ROUTES *
 **********/

//
//  ///////////////////////
// /////Users Route//////
// ///////////////////////
//
//
//  app.get('/', function homepage(req, res) {
//    res.sendFile(__dirname + '/views/index.html');
//  });
//
//  // Get all users
// app.get('/users', function (req, res) {
//   db.User.find(function(err, users) {
//     if (err) {
//       return console.log('Get all users' + err);
//     }
//     console.log('Get all users succ' + users);
//     res.json(users);
//   });
// });
//
// //Get a single user
// app.get('/users/:id', function(req, res) {
//   db.User.findOne({_id: req.params.id}, function(err, user) {
//     res.json(user);
//   });
// });
//
// // Create a new user
// app.post('/users', function(req, res) {
//   var user = new db.User(req.body);
//   user.save(function(err, newUser) {
//     res.json(newUser);
//   });
// });
//
// //Update a single user
// app.put('/users/:id', function(req, res) {
//   db.User.findOne({_id: req.params.id}, function(err, user) {
//     user.email = req.body.email;
//     user.imageUrl = req.body.imageUrl;
//   });
//   user.save(function(err, newUser) {
//   res.json(newUser);
//   });
// });
//
// // Delete a single user
// app.delete('/users/:id', function(req, res) {
//   db.User.findOneAndRemove({_id: req.params.id}, function(err, user) {
//     res.json(user);
//   });
// });
//
// ///////////////////////
// /////Videos Route//////
// ///////////////////////
//
// // Get all videos
// app.get('/videos', function(req, res) {
//   db.Video.find(function(err, videos) {
//     if (err) {
//       return console.log('Get all videos error: ' + err);
//     }
//     res.json(videos);
//   });
// });
//
//
// //Get a single video
// app.get('/videos/:id', function(req, res) {
//   db.Video.findOne({_id: req.params.id}, function(err, video) {
//     res.json(video);
//   });
// });
//
// // create a new video
// app.post('/videos', function(req, res) {
//   var video = new db.Video(req.body);
//   video.save(function(err, newVideo) {
//     res.json(newVideo);
//   });
// });


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});



/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);

app.get('/api/users', controllers.users.index);
app.get('/api/users/:userId', controllers.users.show);
app.post('/api/users', controllers.users.create);
app.delete('/api/users/:userId', controllers.users.destroy);
// app.put('/api/users/:userId', controllers.users.update);

app.get('/api/videos/:userId', controllers.videos.index);
app.post('/api/videos/:userId', controllers.videos.create);
app.delete('/api/videos/:userId', controllers.videos.destroy);

// ALL OTHER ROUTES (ANGULAR HANDLES)
// redirect all other paths to index
app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
