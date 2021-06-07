const express = require('express')
const logger = require('morgan')
const item = require('./routes/item') 
const order = require('./routes/order') 
const rate = require('./routes/rate') 
const restaurant = require('./routes/restaurant')
const users = require('./routes/users');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
var jwt = require('jsonwebtoken')
const app = express()
app.use(cors());

app.set('secretKey', 'CRUDUNESC')

// connection to mongodb
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

connectToDatabase();

async function connectToDatabase(){
  try {
    // mongoose.set('useCreateIndex', true);
    // mongoose.set('useFindAndModify', false);
    await mongoose.connect('mongodb+srv://dhawal:conaug123@cluster0.4kodc.mongodb.net/node_rest_api?retryWrites=true&w=majority')
    console.log('Connected to Database !!!');
  } catch (error) {
    console.log(error);
    console.log('Connection failed !!!');
  }
}

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.json({"tutorial" : "Crud Rest API"})
})

// public route
app.use('/users', users)

app.use('/item', validateUser, item)
app.use('/order', validateUser, order)
app.use('/rate', validateUser, rate)
app.use('/restaurant', validateUser, restaurant)


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204)
})

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null})
    }else{
      // add user id to request
      req.body.userId = decoded.id
      next()
    }
  })
  
}

// handle errors
app.use(function(err, req, res, next) {
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"})
  else	
    res.status(500).json({message: "Something looks wrong"})

})


app.listen(3000, function(){
	console.log('Node server listening on port 3000')
})
