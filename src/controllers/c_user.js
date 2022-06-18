import * as s_user from "../services/s_user"
import * as s_tran from "../services/s_tran"
let postLogin = async (req, res) => {
    console.log(req.body);
    let sdt = req.body.sdt;
    let password = req.body.password;
    let userData = await s_user.checkLogin(sdt, password);
    return res.status(200).json({
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    });
}
//hien thi all user
let displaygetAllUser = async (req, res) => {
    let data = await s_user.getAllUser();
    console.log(data);
    return res.send(data);
}
//them user
let postdangki = async (req, res) => {
    let message = await s_user.createUser(req.body);
    // console.log(message);
    return res.send('post dangki');

}
//tao tran solo
let postCreateGameSolo = async (req, res) => {
    let message = await s_tran.CreateGameSolo(req.body);
    // console.log(message);
    return res.send('post solo');

}
let postJoinGameSolo = async (req, res) => {
    let message = await s_tran.updateIdDoikhach(1);
    console.log(message);
}



export { postLogin, displaygetAllUser, postdangki, postCreateGameSolo, postJoinGameSolo };