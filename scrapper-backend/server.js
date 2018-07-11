let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/tokped', require('./routes/tokped'));

var port = process.env.PORT || '8080';

app.listen(port, function () {
  console.log(`Server is listening on port ${port}!`)
})

module.exports = app;