const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const paymentRouter = require('./controllers/payment');
const apiRouter = require('./controllers');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', paymentRouter)
app.use('/api', apiRouter)

app.listen(port, function () {
  console.log('listening on port', port);
})

module.exports = app;