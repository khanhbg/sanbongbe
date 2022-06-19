
// import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from "./config/viewEngine.js"
import initWebRoutes from './routes/web.js';
import dotenv from 'dotenv';
import connectD from "./config/connectDB";
var express = require('express')
var cors = require('cors')
//import database from './DB.js'
dotenv.config();
let app = express();
//app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configViewEngine(app);
initWebRoutes(app);
connectD();

let port = 3000
app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})
