const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongooseLoader = require('./database');
const logger = require('./utils/logger');

const paymentRouter = require('./controllers/payment');
const apiRouter = require('./controllers');

mongooseLoader.load({ logger })

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', paymentRouter)
app.use('/api', apiRouter)

app.listen(port, function () {
  logger.info(`server listening on port ${port}`);
})

module.exports = app;