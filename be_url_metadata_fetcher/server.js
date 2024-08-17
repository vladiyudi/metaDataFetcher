const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { getUrlsMetadata } = require('./controlers/getUrlsMetadata');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 1000, 
    max: 5 
});
app.use(limiter);

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
  }));

  app.use(helmet());

app.use(morgan('combined'));
app.use(cookieParser());


if (process.env.NODE_ENV !== 'test') {
  app.use(csrf({ 
      cookie: {
          secure: true,
          sameSite: 'none'
      } 
  }));

  app.get('/csrf-token', (req, res) => {
      res.json({ csrfToken: req.csrfToken() });
  });
} 

app.post('/fetch-metadata', getUrlsMetadata, (req, res) => {});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
