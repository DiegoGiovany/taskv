'use strict';

const express = require('express');
const cors = require('cors');
const routerMiddleware = require('./routes/REST_routes');

global['mongoose']=require('mongoose');

async function main(app) {
  await global['mongoose'].connect('mongodb://localhost:27017/todo');
}


const app = express();


main(app).catch(err => console.log(err));

app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

routerMiddleware(app);

module.exports = app;
