const Clarifai= require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAI
});

const handleApiCall=(req,res)=>{
	app.models
		.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
		.then(data =>{
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage=(req,res,db)=> {
	db.from('users')
	.where('id','=', req.body.id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err => res.status(400).json(err))
}

module.exports = {
	handleImage:handleImage, 
	handleApiCall:handleApiCall
};