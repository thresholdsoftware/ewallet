import chai from 'chai'; //eslint-disable-line
import chaiHttp from 'chai-http'; //eslint-disable-line

chai.use(chaiHttp);
const {expect} = chai;

describe('UserController', () => {
  it('failes to create user if not sufficient details', (done) => {
    chai.request('http://localhost:1337')
    .post('/signup')
    .send({password: 'testpass'})
    .end((err, res) => {
      expect(res).to.have.status(500);
      done();
    });
  });
  it('creates the user successfully', (done) => {
    chai.request('http://localhost:1337')
    .post('/signup')
    .send({phone: '9876543210', password: 'testpass'})
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
});
