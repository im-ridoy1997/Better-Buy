const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route.js');
require('dotenv').config();


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});