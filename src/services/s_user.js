
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import db from '../models/index';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

//lay tat ca user
dotenv.config();
const jwtCode = process.env.JWTCODE;
//tim user theo id
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
                attributes: ['id', 'nameTeam', 'phoneNumber', 'email', 'pointRank', 'money']
            })
            if (user) {
                resData = {
                    code: 0,
                    message: "OK",
                    user: user
                }
            } else {
                resData = {
                    code: 5,
                    message: "Loi DB"
                }
            }

            resolve(resData);
        } catch (e) {
            reject(e);
        }
    })
}
//tao moi user
let createUser = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let resData = {};
            if (data.userName) {
                if (data.password) {
                    if (data.phoneNumber) {
                        let hassPass = await hashPassword(data.password);
                        let user = await db.User.findOrCreate({
                            where: { userName: data.userName },
                            defaults: {
                                userName: data.userName,
                                phoneNumber: data.phoneNumber,
                                password: hassPass,
                                role: 'user',
                                vip: 0,
                                money: 0
                            }
                        })
                        if (user) {
                            if (user[1]) {
                                resData.code = '0'
                                resData.message = 'Dang ki thanh cong';
                            } else {
                                resData.code = '5'
                                resData.message = 'Tai khoan da ton tai';
                            }

                        } else {
                            resData.code = '6'
                            resData.message = 'loi DB';
                        }

                    } else {
                        resData.code = '3'
                        resData.message = 'Ban can dien so dien thoai';
                    }

                } else {
                    resData.code = '2'
                    resData.message = 'Ban can dien mat khau';
                }
            } else {
                resData.code = '1'
                resData.message = 'Ban can dien user name';
            }
            resole(resData);
        } catch (e) {
            console.log(e)
            let resData = {};
            resData.code = '7'
            resData.message = 'loi server';
            reject(resData)
        }
    })
} //ok
//update user
let updateUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let user = await await db.User.findOne({ where: { id: data.idUser } })
            if (user) {
                user.nameTeam = data.nameTeam
                user.sdt = data.sdt;
                user.email = data.email;
                await user.save();
                resData = {
                    code: 0,
                    message: "Cap nhat thong tin thanh cong"
                }
                resolve(resData);
            } else {
                resData = {
                    code: 2,
                    message: "Tai khoan khong ton tai"
                }
                resolve(resData);
            }
        } catch (e) {
            let resData = {};
            resData.code = '7'
            resData.message = 'loi server';
            reject(resData)
        }
    })
}
//Doi mat khau
let updatePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let hassPass = await hashPassword(data.password);
            let user = await db.User.findOne({ where: { id: data.idUser } })
            if (user) {
                let compare = await bcrypt.compareSync(data.oldPassword, user.password);
                if (compare) {
                    if (await bcrypt.compareSync(data.password, user.password)) {
                        resData = {
                            code: -1,
                            message: "Mật khẩu mới phải khác mật khẩu cũ"
                        }
                        resolve(resData);
                    }
                    user.password = hassPass
                    await user.save();
                    resData = {
                        code: 0,
                        message: "Đổi mật khẩu thành công"
                    }
                    resolve(resData);
                }
                resData = {
                    code: -2,
                    message: "Mật khẩu cũ không đúng"
                }
                resolve(resData);

            } else {
                resData = {
                    code: 5,
                    message: "Loi DB"
                }
                resolve(resData);
            }
        } catch (e) {
            let resData = {};
            resData = {
                code: 7,
                message: 'Loi Server '
            }
            reject(resData);
        }
    })
}
//xoa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
// bam mat khau
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await bcrypt.hashSync(password, salt);
            resolve(hashPass);
        } catch (e) {
            reject(e)
        }
    })
}

let checkLogin = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: { userName: userName },
                raw: true,
            })
            if (user) {
                let checkPassword = await bcrypt.compareSync(password, user.password);
                if (checkPassword) {
                    userData.code = '0'
                    userData.message = 'Dang nhap thanh cong';
                    delete user.password;
                    userData.user = user;
                    let tokenIdUserName = jwt.sign(user.id, jwtCode);
                    userData.tokenIdUserName = tokenIdUserName;

                } else {
                    userData.code = '1'
                    userData.message = 'Sai mat khau';
                }
            } else {
                userData.code = '2'
                userData.message = 'Tai khoan khong ton tai';
            }

            resolve(userData);
        } catch (e) {
            userData.code = '7'
            userData.message = 'Loi server';
            reject(userData)
        }
    })
}
let isLogin = (req, res, next) => {
    try {
        let token = req.cookies.cookieIdUserName;
        console.log(token)
        let idUser = jwt.verify(token, jwtCode)
        console.log(idUser)
        if (idUser) {
            req.idUser = idUser
            next();
        } else {
            return res.json('Ban chua dang nhap')
        }
    } catch (e) {
        let resData = {}
        resData.code = 7
        resData.message = 'Ban chua dang nhap'
        return res.send(resData)
    }
}
//lay theo bang xep hang
let rankTeam = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let user = await db.User.findAll({
                attributes: ['id', 'nameTeam', 'pointRank'],
                order: [['pointRank', 'DESC']],
                raw: true,
            });
            if (user) {
                resData.code = '0';
                resData.message = 'ok';
                resData.user = user;
            } else {
                resData.code = '1';
                resData.message = 'loi DB';
            }
            resolve(resData)

        } catch (e) {
            resData.code = '5';
            resData.message = 'Loi server';
            reject(resData);
        }
    })
}//ok
let getVipUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
                attributes: ['vip', 'money', 'pointRank']
            })
            resolve(user);
        } catch (e) {
            reject({});
        }
    })
}
let updateMoney = (id, money) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                user.money = money
                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}
//update rank
let updatePointRank = (userId, pointRank) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            })
            if (user) {
                //let pointRank= user.pointRank 
                user.pointRank = user.pointRank + pointRank
                user.save();
            }
            resolve();
        } catch (e) {
            reject();
        }
    })
}
//loin face
let createUserFb = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            console.log('------------')
            console.log(data)
            let resData = {};
            let user = await db.User.findOrCreate({
                where: { id: 42 },
                defaults: {
                    id: 42,
                    userName: data.userName,
                    role: 'user',
                    vip: 0,
                    money: 0
                }
            })

            if (user) {
                console.log('-------------')
                console.log(user[1])
                console.log('-------------')
                if (user[1]) {
                    resData.code = 0
                    resData.message = 'Dang ki thanh cong';
                    resData.user = user[0]
                    resole(resData);
                } else {
                    resData.code = 5
                    resData.message = 'Tai khoan da ton tai';
                    resData.user = user[0]
                    resole(resData);
                }

            } else {
                resData.code = 7
                resData.message = 'loi DB';
                resole(resData);
            }


        } catch (e) {
            let resData = {};
            resData.code = '8'
            resData.message = 'loi server';
            reject(resData)
        }
    })
} //ok

export {
    createUser, getUserById, checkLogin,
    deleteUserById, isLogin, rankTeam, updateUserById,
    getVipUser, updateMoney, updatePassword, updatePointRank, createUserFb
}