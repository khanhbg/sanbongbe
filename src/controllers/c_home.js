import db from '../models/index'
import * as s_user from "../services/s_user"
import * as s_match from "../services/s_match"
import * as s_pitch from "../services/s_pitch"
//xem bang xep hang clb
let getRankTeam = async (req, res) => {
    let resData = await s_user.rankTeam();
    return res.status(200).json({
        code: resData.code,
        message: resData.message,
        user: resData.user ? resData.user : {}
    });
}
//tim kiem lich dat san theo ngay, san
let getSearchMatch = async (req, res) => {
    try {
        let reqData = req.body;
        let day = req.query.day
        let days = new Date(day);
        reqData.day = days;
        let resData = null;
        if (req.query.idPitch == null) {
            resData = await s_match.SearchMatch(reqData);
        }
        else {
            reqData.idPitch = req.query.idPitch;
            resData = await s_match.SearchMatch(reqData);
        }
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message,
                match: resData.match ? resData.match : {}
            });
        } else {
            return res.status(400).json({
                code: 8,
                message: "bad request"
            })

        }
    } catch {
        return res.status(400).json({
            code: 8,
            message: "bad request"
        })
    }

}
//hien san trang thia = 1 de dat
let getPitch = async (req, res) => {
    let resData = await s_pitch.getPitch();
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            pitch: resData.pitch
        });
    }
    else return res.send('loi server')
}
export { getRankTeam, getSearchMatch, getPitch }