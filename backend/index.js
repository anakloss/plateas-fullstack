if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');


// initializations
const app = express();
require('./database');


// settings
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


// routes
app.use('/api/plateas', require('./routes/plateas'));


// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
