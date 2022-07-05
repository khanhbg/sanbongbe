import * as s_user from "../services/s_user"
import * as s_match from "../services/s_match"
import * as s_comment from "../services/s_comment"
import jwt from 'jsonwebtoken'
const jwtCode = process.env.JWTCODE;
//login
let postLogin = async (req, res) => {
    //console.log(req.body);
    try {
        let userName = req.body.userName;
        let password = req.body.password;
        console.log(userName)
        console.log(password)
        let resData = await s_user.checkLogin(userName, password)
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message,
                cookieIdUserName: resData.tokenIdUserName,
                user: resData.user ? resData.user : {}

            });
        }

    } catch {
        return res.status(400).json({
            code: 8,
            message: 'bad request'
        })
    }


}//ok

//register
let postRegister = async (req, res) => {
    try {
        // console.log(req.body)
        let resData = await s_user.createUser(req.body);
        console.log(resData);
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message
            });
        }
        else {
            return res.status(400).json({
                code: 8,
                message: 'bad request'
            })
        }
    } catch (e) {
        // console.log(e)
        return res.status(400).json({
            code: 8,
            message: 'bad request'
        })
    }

} //ok
//login fb
let loginFb = async (req, res) => {
    try {
        let reqData = {};
        reqData.userName = req.user.displayName;
        reqData.id = req.user.id
        console.log(reqData)
        return reqData.id
        // let resData = await s_user.createUserFb(reqData);
        // console.log(reqData)
        // if (resData) {
        //     return res.status(200).json({
        //         code: resData.code,
        //         message: resData.message
        //     });
        // }
        // else {
        //     return res.status(400).json({
        //         code: 6,
        //         message: 'Dang nhap that bai'
        //     })
        // }
    } catch {
        return res.status(400).json({
            code: 8,
            message: 'Dang nhap that bai'
        })
    }

} //ok
//tao tran
let postCreateNewMatch = async (req, res) => {
    try {
        let reqData = {};
        let idUser = req.idUser;
        console.log(idUser)
        reqData = req.body;
        reqData.idUser = idUser
        let resData = await s_match.CreateNewMatch(reqData);
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message
            });
        }
        else {
            return res.status(200).json({
                code: 6,
                message: 'Tao tran that bai'
            })
        }
    } catch {
        return res.status(200).json({
            code: 6,
            message: 'Tao tran that bai'
        })
    }

}//ok
let postUpdateMatch = async (req, res) => {
    //let id = req.query.id;
    let resData = await s_match.updateMatchById(req.body);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message
        });
    }
    else return res.send('Loi server')
}
let getHistoryUser = async (req, res) => {
    try {
        let reqData = {};
        reqData.idUser = req.idUser;
        reqData.fDay = req.query.fDay;
        reqData.tDay = req.query.tDay;
        reqData.status = req.query.status;
        console.log(reqData)
        let resData = await s_match.getHistoryUser(reqData);
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message,
                match: resData.match ? resData.match : {}
            });
        }
        else {
            return res.json({
                code: 6,
                message: 'Show Histror that bai'
            })
        }
    } catch {
        return res.json({
            code: 9,
            message: 'Show Histror that bai'
        })
    }

}//ok
//show cac tran cap keo
let getShowMatchSolo = async (req, res) => {
    let resData = await s_match.getMatchSolo();
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            match: resData.match ? resData.match : {}
        });
    }
    else return res.send('Loi server')
} //ok
let getJoinMatch = async (req, res) => {
    let reqData = {};
    reqData.idMatch = req.query.idMatch;
    reqData.idUser = req.idUser;
    console.log(reqData.idUser)
    let resData = await s_match.joinMatchSolo(reqData);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            match: resData.match ? resData.match : {}
        });
    }
    else return res.send('Loi server')
} //ok
//tao comment

let postCreateComment = async (req, res) => {
    try {
        console.log('-----------------')
        console.log(req.body)
        let reqData = req.body
        reqData.idUser = req.cookies.cookieIdUserName
        console.log(reqData)
        let resData = await s_comment.createComment(reqData);
        // console.log(message);
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message
            });
        }
        else {
            return res.json({
                code: 6,
                message: 'Tao comment that bai'
            })
        }
    } catch {
        return res.json({
            code: 6,
            message: 'Tao comment that bai'
        })
    }

}//ok
let getShowComment = async (req, res) => {
    let resData = await s_comment.getAllComment();
    // console.log(message);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            comment: resData.comment ? resData.comment : {}
        });
    }
    else return res.send('loi server')
}//ok
//ranka team
let getRankTeam = async (req, res) => {
    let resData = await s_user.rankTeam();
    //let abc = req.cookies.khanh
    console.log(resData);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            user: resData.user ? resData.user : {}
        });
    }
    else return res.send('loi server')
}//ok

//show User
let getUserById = async (req, res) => {
    let idUser = req.idUser
    let resData = await s_user.getUserById(idUser);
    if (resData) {
        return res.status(200).json({
            code: resData.code,
            message: resData.message,
            user: resData.user ? resData.user : {}
        });
    }
    else return res.send('loi server')
}
//updateUser
let postUpdateProfile = async (req, res) => {
    try {
        let reqData = req.body
        let idUser = req.idUser
        reqData.idUser = idUser
        let resData = await s_user.updateUserById(reqData);
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message,
            });
        }
        else {
            return res.json({
                code: 6,
                message: 'Update that bai'
            })
        }
    } catch {
        return res.json({
            code: 6,
            message: 'Update that bai'
        })
    }

}
//cap nhat password
let postUpdatePassword = async (req, res) => {
    try {
        let reqData = req.body
        let idUser = req.idUser
        reqData.idUser = idUser
        let resData = await s_user.updatePassword(reqData);
        if (resData) {
            return res.status(200).json({
                code: resData.code,
                message: resData.message,
            });
        }
        else {
            return res.json({
                code: 6,
                message: 'Cap nhat mat khau that bai'
            })
        }
    } catch {
        return res.json({
            code: 9,
            message: 'Cap nhat mat khau that bai'
        })
    }

}
export {
    postLogin, postRegister, postCreateNewMatch, postUpdateMatch,
    getHistoryUser, getShowMatchSolo, getJoinMatch, postCreateComment,
    getShowComment, getRankTeam, getUserById, postUpdateProfile,
    postUpdatePassword, loginFb
};