import express from "express";
import * as test from "../controllers/c_test.js"
import * as c_user from "../controllers/c_user"
//import * as c_match from "../controllers/c_match"
import * as s_user from "../services/s_user"
import * as s_match from "../services/s_match"
import * as s_pitch from "../services/s_pitch"
import * as s_code from "../services/s_code"

let router = express.Router();
//router.get('/khanh', test.trankhach);
router.get('/join', s_pitch.getAllPitch);
//router.get('/match', test.matchcode);
export default router;