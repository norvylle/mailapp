const express = require('express');
const app = express();
const router = require(__dirname + '/router');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cors')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router(express.Router()));

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(3001, (err) => {
  if (err) { console.log(err); }
  else { console.log('\nserver is running at http://localhost:3001'); }
});

module.exports = (app) => {
  return app
}