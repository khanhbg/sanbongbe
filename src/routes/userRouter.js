import express from "express";
import * as c_user from "../controllers/c_user"
let router = express.Router();
router.post('/login', c_user.postLogin);
router.post('/register', c_user.postdangki);
router.post('/creategamesolo', c_user.postCreateGameSolo);
router.get('/khanh', c_user.displaygetAllUser);
//router.get('/',test.getTest)
router.post('/khanhh', c_user.postJoinGameSolo);
export default router;