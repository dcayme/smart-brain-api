
const handleRegister= (req,res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if(!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}
	
	db.transaction((trx) => {	
		trx.insert({
			'email': req.body.email,
			'hash': bcrypt.hashSync(req.body.password)
		})
		.into('login')
		.returning('email')
		.then(
			trx.insert({
				'email': req.body.email,
				'name': req.body.name,
				'joined': new Date(),
				'entries': 0
			})
			.into('users')
			.returning('*')
			.then( data =>{
				res.json(data[0])
			})
			.catch(err=> res.status(400).json('unable to register'))	
		)
		.then(trx.commit)
		.catch(trx.rollback)
		.catch(err=> res.status(400).json('unable to register, try again'))
	})
}

module.exports = {
	handleRegister: handleRegister
};