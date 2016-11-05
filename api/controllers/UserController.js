const signup = (req, res) => {
  User.create(req.body).then((u) => {
    res.status(200).json(u);
  }, (err) => {
    res.status(500).json(err);
  });
};

module.exports = {
  signup
};
