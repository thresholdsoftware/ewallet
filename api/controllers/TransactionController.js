const transact = (req, res) => {
	return Transaction.create(req.body).then((u) => {

		res.status(200).json(u);
	}, (err) => {
		
		if(err  instanceof  Error ){
			res.status(400).json({"database_error": err.message});
		}else{

			res.status(400).json(err);
		}
	});
};


module.exports = {
	transact
}