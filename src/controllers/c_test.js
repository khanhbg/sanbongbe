import db from '../models/index'
import * as s_user from "../services/s_user"
import * as s_tran from "../services/s_match"
import * as s_code from "../services/s_code"
let getTest = (req, res) => {
    //return res.send("HELLO");
    return res.render("test.ejs");
}
let getT = async (req, res) => {
    let time = "06:00-07:30"
    let user = await s_code.getKeyT(time);
    console.log(user);
}
let getdata = async (req, res) => {
    try {
        let data = await db.User.findAll({
            raw: true,
        });
        console.log(data);
    } catch (e) {
        console.log(e);
    }

}
let userid = async (req, res) => {
    let user = await s_user.getUserById(1);
    console.log(user.idClub);
}
let useridd = async (req, res) => {
    let user = await s_user.getIdClbById(2);
    console.log(user)
}
let trankhach = async (req, res) => {
    let tran = await s_tran.updateIdDoikhach();
    console.log(tran);
}


export { getTest, getT, getdata, userid, trankhach, useridd };