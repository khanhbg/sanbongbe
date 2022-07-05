import * as s_user from "../services/s_user"
import * as s_match from "../services/s_match"
import * as s_comment from "../services/s_comment"
import * as s_pitch from "../services/s_pitch"
let getShowMatchUpdate = async (req, res) => {
    //let id = req.query.id;
    let day = req.query.day
    let resData = await s_match.getShowMatchAdmin(new Date(day));
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            data: resData.match
        });
    }
    else return res.send('Loi server')
}
let postUpdateMatch = async (req, res) => {
    //let id = req.query.id;
    //console.log('hay')
    let idMatch = req.query.id;
    let reqData = req.body;
    reqData.idMatch = idMatch;
    let resData = await s_match.updateMatchAdmin(reqData);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            data: resData.match
        });
    }
    else return res.send('Loi server')
}
let getDeleteMatch = async (req, res) => {
    //let id = req.query.id;
    let id = req.query.id
    let resData = await s_match.deleteMatchById(id);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            //data: resData.match
        });
    }
    else return res.send('Loi server')
}
let getDeleteComment = async (req, res) => {
    let id = req.query.id
    let resData = await s_comment.deleteComment(id);
    // console.log(message);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message
        });
    }
    else return res.send('loi server')
}
//hien all san

let getAllPitch = async (req, res) => {
    let resData = await s_pitch.getAllPitch();
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            pitch: resData.pitch
        });
    }
    else return res.send('loi server')
}
//update pitch
let postUpdatePitch = async (req, res) => {
    let reqData = req.body;
    let idPitch = req.body.idPitch;
    reqData.idPitch = idPitch;
    let resData = await s_pitch.updatePitch(reqData);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
        });
    }
    else return res.send('loi server')
}
export {
    getShowMatchUpdate, postUpdateMatch, getDeleteMatch, getDeleteComment,
    getAllPitch, postUpdatePitch
}