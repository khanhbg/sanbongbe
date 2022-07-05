import express from "express";
import * as c_user from "../controllers/c_user"
import * as s_user from "../services/s_user"
import passport from 'passport';
let router = express.Router();
router.get('/auth/facebook',
    passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.json('abc')
    });

export default router;