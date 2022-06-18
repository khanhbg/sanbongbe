
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import db from '../models/index';
//lay tat ca user
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                include: [{ model: db.Clb, as: 'r_idClb' }],
                raw: true,
                nest: true,
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}
//tim user theo id
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            resolve(user);
        } catch (e) {
            reject({});
        }
    })
}
//tao moi user
let createUser = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let hassPass = await hashPassword(data.password);
            await db.User.create({
                ten: data.ten,
                sdt: data.sdt,
                mk: hassPass,
                //email: data.email,
                //ngaysinh: data.ngaysinh,
                //gioitinh: data.gioitinh === "1" ? true : false,
            })
            resole("ok");
        } catch (e) {
            reject(e);
        }
    })
}
//update user
let updateUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await getUserById(data.id);
            if (user) {
                user.ten = data.ten;
                user.sdt = data.sdt;
                user.role = data.role;
                user.email = data.email;
                user.ngaysinh = data.ngaysinh;
                user.cannang = data.cannang;
                user.chieucao = data.chieucao;
                user.vitri = data.vitri;
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

let checkSdt = (sdt) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { sdt: sdt },
                raw: true,
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject({});
        }
    })
}
let checkLogin = (sdt, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isUser = await checkSdt(sdt)
            if (isUser) {
                let user = await db.User.findOne({
                    where: { sdt: sdt },
                    raw: true,
                })
                if (user) {
                    let checkPassword = await bcrypt.compareSync(password, user.mk);
                    if (checkPassword) {

                        userData.errMessage = 'Ok';
                        delete user.mk;
                        userData.user = user;
                    } else {
                        userData.errMessage = 'Sai mat khau';
                    }
                } else {
                    userData.errMessage = 'Tai khoan khong ton tai';
                }
            } else {
                userData.errMessage = 'So dien thoai chua duoc dang ki';
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}
//lay thong tin clb 
let getIdClbById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                include: [{ model: db.Clb, as: 'r_idClb' }],
                raw: true,
                nest: true,
            })
            if (user) {
                resolve(user)
            }
        } catch (e) {
            reject(e);
        }
    })
}


export { getAllUser, createUser, getUserById, checkLogin, getIdClbById, deleteUserById }