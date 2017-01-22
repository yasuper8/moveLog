// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    controllers = require('./controllers');

// var mongoose = require('mongoose');
// var User = require('./models/user');
// var session = require('express-session');
// var Video = require('./models/video');
// var db = require('./models');

// MIDDLEWARE

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
// app.use(session({
//  saveUninitialized: true,
//  resave: true,
//  secret: 'SuperSecretCookie',
//  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
// }));
// parse incoming urlencoded form data
// and populate the req.body object
app.use(bodyParser.urlencoded({
  extended: true
}));
// mongoose.connect('mongodb://localhost/movelog');
// app.set('view engine', 'ejs');

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

// // get signup route
// app.get('/signup', function (req, res) {
//  res.render('signup');
// });
//
// // post sign up route
// app.post('/users', function (req, res) {
//  console.log(req.body)
//  // use the email and password to authenticate here
//  User.createSecure(req.body.email, req.body.password, function (err, newUser) {
//    req.session.userId = newUser._id;
//    res.redirect('/profile');
//  });
// });
//
// // get login route
// app.get('/login', function (req, res) {
//  res.render('login');
// });
//
// // authenticate and log in user
// app.post('/sessions', function (req, res) {
//  // use the email and password to authenticate here
//  User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
//    if (err){
//      console.log('authentication error: ', err);
//      res.status(500).send();
//    } else {
//      req.session.userId = loggedInUser._id;
//      res.redirect('/profile');
//    }
//  });
// });
//
// app.get('/profile', function (req, res) {
// // find user currently logged in
// User.findOne({_id: req.session.userId}, function (err, currentUser) {
//  res.render('profile.ejs', {user: currentUser})
//  });
// });
//
// // get logout route
// app.get('/logout', function (req, res) {
// // remove the session user id
// req.session.userId = null;
// // redirect to login
// res.redirect('/login');
// });


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
