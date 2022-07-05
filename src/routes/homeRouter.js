import express from "express";
import * as c_home from "../controllers/c_home"
let router = express.Router();
router.get('/rankTeam', c_home.getRankTeam);
router.get('/searchMatch', c_home.getSearchMatch);
router.get('/getPitch', c_home.getPitch)

export default router;