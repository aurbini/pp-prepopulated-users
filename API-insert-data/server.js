const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const db = require('./app/models');


var corsOptions = {
  origin: 'http://localhost:8081',
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


//User Routes
require('./app/routes/user.routes')(app);
db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Alex Node Parentparty application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
