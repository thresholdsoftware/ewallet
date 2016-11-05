const signup = (req, res) => {

	
	let requestBody  ={
		name: req.body.name,
		phone : req.body.phone,
	 	email : req.body.email,
	 	password:req.body.password	
	 }
	
	User.create(requestBody).then((u)=>{
			res.status(200).json(u);
	},(err)=>{
		res.status(500).json(err);
	});
};


module.exports ={ 

	signup
};