const handleProfileGet= (req,res,db) =>{
	db.select('*').from('users')
	.where('id', '=', req.params.id)
	.then(user =>{
		if (user.length){
			res.json(user[0])
		}
		else{
			res.status(400).json('could not get id')
		}
	})
	.catch(err => res.status(400).json('could not get id'))
}

module.exports= {
	handleProfileGet:handleProfileGet
};