import db from '../models/index'
import * as s_user from "../services/s_user"
import * as s_tran from "../services/s_tran"
let getTest = (req, res) => {
    //return res.send("HELLO");
    return res.render("test.ejs");
}
let getT = (req, res) => {

    return res.render("t.ejs");
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
    let user = await s_user.deleteUserById(8);
    // console.log(user.r_idClb.id);
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