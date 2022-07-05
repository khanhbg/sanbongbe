
// import express from 'express';

import bodyParser from 'body-parser';
import configViewEngine from "./config/viewEngine.js"
import initWebRoutes from './routes/web.js';
import dotenv from 'dotenv';
import connectD from "./config/connectDB";
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session'
let FacebookStrategy = require('passport-facebook').Strategy
var express = require('express')
dotenv.config();

let app = express();
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(nul, obj)
})
passport.use(new FacebookStrategy({
  clientID: '568459111320059',
  clientSecret: '574980a0beca281b6f254e0456cd2baf',
  callbackURL: "http://localhost:3000/user/auth/facebook/callback"
}, function (accessToken, refresToken, profile, done) {
  return done(null, profile)
}
))

app.use(cookieParser())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'kayboard cat',
  resave: true,
  saveUninitialized: true,
  key: 'sid'
}));
app.use(passport.initialize())
app.use(passport.session())

configViewEngine(app);
initWebRoutes(app);
app.use('/', (req, res) => {
  return res.json('home')
})
connectD();

let port = 3000
app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})
