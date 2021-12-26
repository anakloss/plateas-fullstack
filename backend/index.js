if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const socketIO = require('socket.io');


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
app.use(webpackDevMiddleware(webpack(webpackConfig)));


// routes
app.use('/api/plateas', require('./routes/plateas'));


// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting server
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});


// websockets
const io = socketIO(server);

io.on('connection', socket => {
  console.log('new connection', socket.io);

  socket.on('platea:cont', () => {
    io.sockets.emit('platea:cont');
  });

  socket.on('platea:accion', data => {
    socket.broadcast.emit('platea:accion', data);
  });

});
