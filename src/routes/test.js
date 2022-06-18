import express from "express";
import * as test from "../controllers/c_test.js"
import * as user from "../controllers/c_user"
let router = express.Router();
router.get('/khanh', test.trankhach);
router.get('/join', test.userid);
//router.get('/',test.getTest)

export default router;