import {expect} from 'chai'; //eslint-disable-line
import _ from 'lodash';

describe('User model', () => {
  let account = {};
  beforeEach(() => {
    account = {
      email: 'test',
      password: 'test'
    };
  });
  it('removes password', () => {
    expect(Account.testExports.removePassword(account)).to.deep.equal({email: 'test'});
  });
  it('hashes password', () => {
    const beforeUpdateUser = _.assign({}, account);
    return Account.testExports.hashPassword(account, () => {}).then(() => {
      expect(account.password).to.be.ok; //eslint-disable-line
      expect(account.password).to.be.not.equal(beforeUpdateUser.password);
    });
  });
});
