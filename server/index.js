const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const businessRoutes = require('./routes/business-routes');
const commentRoutes = require('./routes/comment-routes');
require("dotenv").config();

const { MONGO_URI } = process.env;
const PORT = 8000;

const app = express();
app.use((cors()));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use("/", express.static(__dirname + "/"))

app.use("/user", userRoutes);
app.use('/business', businessRoutes);
app.use('/comment', commentRoutes);
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