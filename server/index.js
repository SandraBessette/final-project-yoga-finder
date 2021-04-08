const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const userRoutes = require('./routes/user-routes');
const businessRoutes = require('./routes/business-routes');
const commentRoutes = require('./routes/comment-routes');
const chatRoutes = require('./routes/chat-routes');
const Websockets = require('./utils/Websockets');
require("dotenv").config();

const { MONGO_URI } = process.env;


const app = express();
const server = http.createServer(app);
io = socketio(server);

const whitelist = ['https://yoga-finder.netlify.app', 'https://yoga-finder-server.herokuapp.com', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use((cors(corsOptions)));

app.use((req, res, next) => {  
  if (whitelist.indexOf(req.headers.origin) !== -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }

  next();
});
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use("/", express.static(__dirname + "/"))

app.use("/user", userRoutes);
app.use('/business', businessRoutes);
app.use('/comment', commentRoutes);
app.use('/chat', chatRoutes);

app.use('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

io.on('connection', (socket) => Websockets.connection(socket) );
app.set('io', io);





server.listen(process.env.PORT || 8000);

mongoose.connect(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('useFindAndModify', false);