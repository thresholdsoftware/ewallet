const getTest = (req, res) => res.status(200).json({test: 'get'});
const postTest = (req, res) => res.status(200).json({test: 'post'});
const errTest = (req, res) => res.status(500).json({test: 'err'});
module.exports = {
  getTest,
  postTest,
  errTest
};
