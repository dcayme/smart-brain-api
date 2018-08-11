
const handleSignIn= (req,res, db, bcrypt) => {
	return(
		db.select('email', 'hash').from('login')
		.where( 'email' , '=' , req.body.email)
		.then( data=>{
			if (bcrypt.compareSync(req.body.password, data[0].hash)) {
				 db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then( user=>{
					res.json(user[0])
				})
				.catch(err => res.status(400).json(err))
			}
			else{
				res.status(400).json('error logging in')
			}
		})
		.catch(err => console.log(err))
	)
}

module.exports= {
	handleSignIn: handleSignIn
};