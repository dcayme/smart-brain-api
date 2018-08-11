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

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	return (db.select('*').from('users')
		.then( data=> {
			res.json(data)
		})
		.catch(err => console.log(err))
	)
})

app.post('/signin', (req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res)=> {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) =>{image.handleImage(req,res, db)})
app.post('/imageUrl',(req,res) =>{image.handleApiCall(req,res)})

app.listen(4000, console.log('listening on port 4000'))

//Register
//SignUp
//Image
//

//get
//post
//put
//delete