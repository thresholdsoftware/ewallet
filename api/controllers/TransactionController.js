const transact = (req, res) => {
  return Transaction.create(req.body).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(400).json({
      err: err.message || err
    });
  });
};

const getTransactions = (req,res) => {
	const from_account = req.query.from_account;
	const to_account = req.query.to_account;
	const from_date  = req.query.from_date|| new Date();
	const to_date = req.query.to_date || new Date();
	
	if(from_account!=null||from_account!=undefined){
		return Transaction.find({from_account:from_account,createdAt:{'>=':new Date(from_date).toISOString()},createdAt:{'<=':new Date(to_date).toISOString()}}).then((u) => {
			console.log(u);
			return res.status(200).json(u);
		}).catch((err) => {
			console.log(err)
			return res.status(500).json(err);
		})}
		else{
			return Transaction.find({to_account:to_account,createdAt:{'>=':new Date(from_date).toISOString()},createdAt:{'<=':new Date(to_date).toISOString()}}).then((u) => {
				console.log(u);
				return res.status(200).json(u);
			}).catch((err) => {
				console.log(err)
				return res.status(500).json(err);
			})}
		}


module.exports = {
  transact,
  getTransactions
};
