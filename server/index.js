const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const enterpriseRoutes = require('./routes/enterprise-routes');
require("dotenv").config();

const { MONGO_URI } = process.env;
const PORT = 8000;

const app = express();
app.use((cors()));


/*app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })*/
 

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", express.static(__dirname + "/"))

app.use("/user", userRoutes);
app.use('/enterprises', enterpriseRoutes);
app.use('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    success: false,
    message: 'API endpoint doesnt exist'
  })
});


app.listen(PORT, () => console.info(`Listening on port ${PORT}`));

mongoose.connect(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('useFindAndModify', false);