const getBalance = (req, res) => {
	console.log(req.user)
  const phone = req.user.phone
  return Balance.findOne({phone: phone}).populateAll().then((u) => {
    if (!u) {
      return res.status(404).json({message: 'record not found'});
    }
    return res.status(200).json(u);
  }, (err) => {
    return res.status(500).json(err);
  });
};



const createInitialBalanceRecord = (req, res) => {
	const body={
		"phone" :req.user.phone,
		"balance":0
	}

	return Balance.create(body).then((u) => {

		res.status(200).json(u);
	}, (err) => {
		
		res.status(400).json(err);
	});
};


module.exports= {
	getBalance,
	createInitialBalanceRecord
}


