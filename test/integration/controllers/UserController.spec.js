import chai from 'chai'; //eslint-disable-line
import chaiHttp from 'chai-http'; //eslint-disable-line
import Api from '../../../api/services/Api';

chai.use(chaiHttp);
const {expect} = chai;

describe('UserController signup', () => {
  it('failes to create user if not sufficient details', (done) => {
    return Api.post('http://localhost:1337/signup', {password: 'testpass'}).then(() => {}).catch((err) => {
      expect(err.status).to.not.equal(200);
      done();
    });
  });

  it('creates the user successfully', (done) => {
    Api.post('http://localhost:1337/signup', {
      phone: '9999999',
      password: '9999999'
    }).then((res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
});
