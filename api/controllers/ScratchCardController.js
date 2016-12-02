import uuid from 'node-uuid';
import _ from 'lodash';

const generateScratchCard = (req, res) => {
  const amount = parseFloat(req.body.amount);
  const count = parseInt(req.body.count);
  const generationId = uuid.v4();
  const scratchcards = _.map(_.range(0, count), (scindex) => {
    return {amount, generationId};
  });
  return ScratchCard.create(scratchcards).then((sc) => {
    res.status(200).json(sc);
  }).catch(err => res.status(500).json(err));
};

module.exports = {
  generateScratchCard
};
