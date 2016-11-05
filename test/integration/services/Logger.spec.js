import {expect} from 'chai'; //eslint-disable-line

describe('Logger services', () => {
  it('setup', () => {
    expect(Logger.setup).to.be.a.function; //eslint-disable-line
    expect(Logger.setup('test')).to.include.keys('error', 'log');
    expect(Logger.setup('test').error).to.be.a.function; //eslint-disable-line
    expect(Logger.setup('test').log).to.be.a.function; //eslint-disable-line
  });
});
