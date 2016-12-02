import uuid from 'node-uuid';
import _ from 'lodash';

const generateScratchCard = (req, res) => {
  const amount = parseFloat(req.body.amount, 10);
  const count = parseInt(req.body.count, 10);
  const generationId = uuid.v4();
  const scratchcards = _.map(_.range(0, count), () => {
    return {amount, generationId};
  });
  return ScratchCard.create(scratchcards).then((sc) => {
    res.status(200).json(sc);
  }).catch(err => res.status(500).json(err));
};

module.exports = {
  generateScratchCard
};
