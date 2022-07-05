import express from "express";
import * as c_user from "../controllers/c_user"
import * as c_admin from "../controllers/c_admin"
let router = express.Router();
router.get('/deleteComment', c_admin.getDeleteComment);// delete comment
router.get('/showMatchUpdate', c_admin.getShowMatchUpdate);
router.get('/deleteMatch', c_admin.getDeleteMatch);                             //ok
router.get('/getAllPitch', c_admin.getAllPitch);      //show san                //ok


router.post('/updateMatch', c_admin.postUpdateMatch);                           //ok
router.post('/updatePitch', c_admin.postUpdatePitch);   //sua san               //ok                        

export default router;