import express from "express";
import * as c_user from "../controllers/c_user"
import * as s_user from "../services/s_user"
import passport from 'passport';

let router = express.Router();
//login fb
router.get('/auth/facebook',
    passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/user/login' }),
)
router.post('/loginfb', (req, res) => {
    console.log('abc')
    return res.send(req)
});//login       
router.post('/login', c_user.postLogin);//login                                                    ok
router.post('/register', c_user.postRegister);//dang ki                                            ok
router.post('/createMatch', s_user.isLogin, c_user.postCreateNewMatch);//tao tran                  ok
router.post('/createComment', s_user.isLogin, c_user.postCreateComment);//tao comment              ok
router.post('/updateProfile', s_user.isLogin, c_user.postUpdateProfile);//hien profile             ok
router.post('/changePassword', s_user.isLogin, c_user.postUpdatePassword);//cap nhat password      ok

router.get('/historyMatch', s_user.isLogin, c_user.getHistoryUser);//xem lich su tran                    ok
router.get('/showMatchSolo', c_user.getShowMatchSolo);//xem cac tran cap keo             ok
router.get('/joinMatch', s_user.isLogin, c_user.getJoinMatch);//tham gia tran dau                        ok
router.get('/showComment', c_user.getShowComment);//hien comment                         ok
router.get('/rankTeam', c_user.getRankTeam);//hien rankTeam                              ok
router.get('/profile', s_user.isLogin, c_user.getUserById);//hien profile                                ok
export default router;