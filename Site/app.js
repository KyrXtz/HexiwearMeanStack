const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect To Database
mongoose.connect(config.database);

// Connect to Database
mongoose.connect(config.database)
 .then(() => console.log('Connected to db ' + config.database))
	.catch(err => console.log('Db error ' + err));

//Initialising express
const app = express();

//Import Users folder from routes folder
const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'angular-src/dist')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Initialise /users path
app.use('/users', users);

//Point to built index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular-src/dist'));
});
//Point to error.html
app.get('*', function(req, res){
  res.status(404).sendFile(__dirname +'/error.html');
});

//Start Server
app.listen(port, () =>{
  console.log('Server started on port '+port);
});


