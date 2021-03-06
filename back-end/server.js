const express = require('express');


const app = express();
const PORT = 8000;

app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
 

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", express.static(__dirname + "/"))

app.get('/',(req, res)=>{
    res.status(200).json({ status: 200, message: "success"});
})

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));