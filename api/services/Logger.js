import debug from 'debug';

module.exports = {
  setup: (t) => { //eslint-disable-line
    const tag = t || '';
    return {
      log: debug(`ewallet:debug:${tag}`),
      error: debug(`ewallet:err:${tag}`)
    };
  }
};
