import chai from 'chai'; //eslint-disable-line
import chaiHttp from 'chai-http'; //eslint-disable-line
chai.use(chaiHttp);

const {expect} = chai;

describe('Api Service', () => {
  it('get', (done) => {
    chai.request('http://localhost:1337').get('/test').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({test: 'get'});
      done();
    });
  });

  it('post', (done) => {
    chai.request('http://localhost:1337').post('/test').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({test: 'post'});
      done();
    });
  });
  it('err', (done) => {
    chai.request('http://localhost:1337').get('/err').end((err, res) => {
      expect(res).to.not.have.status(200);
      expect(res.body).to.deep.equal({test: 'err'});
      done();
    });
  });
});
