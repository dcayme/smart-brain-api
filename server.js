var express = require('express');
var bodyParser = require('body-parser');
var bcrypt= require('bcrypt-nodejs');
var cors = require('cors');
var knex = require('knex');

const register=require('./controllers/register');
const signIn= require('./controllers/signIn');
const image= require('./controllers/image');
const profile= require('./controllers/profile');

var db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'testing',
    password : 'testing',
    database : `'smart-brain'`
  }
});

Access-Control-Allow-Origin: *

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('it is working!')
})

app.post('/signin', (req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=> {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) =>{image.handleImage(req,res, db)})
app.post('/imageUrl',(req,res) =>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 4000, console.log(`listening on port ${process.env.PORT}`))

//Register
//SignUp
//Image
//

//get
//post
//put
//delete