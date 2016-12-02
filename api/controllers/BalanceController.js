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



module.exports= {
	getBalance
}


