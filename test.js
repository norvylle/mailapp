import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index';

// Configure chai
chai.use(chaiHttp);
chai.should();

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

describe("Mailer", () => {
  describe("ADD A LIST", () => {
    it('should make sure there are no existing lists', (done) => {
      chai.request(app)
          .get('/list')
          .end((err, res) => {
            
          })
    })
  })
})