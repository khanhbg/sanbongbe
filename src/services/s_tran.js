import db from '../models/index';
import * as s_user from "../services/s_user"
const { Op } = require("sequelize");
//lay tat ca tran
let getAllTran = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tran = await db.Tran.findAll({
                raw: true,
            });
            resolve(tran);
        } catch (e) {
            reject(e);
        }
    })
}
//tim tran theo id
let getTranById = (tranId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tran = await db.Tran.findOne({
                where: { id: tranId },
                raw: true,
            })
            if (tran) {
                resolve(tran)
            }
        } catch (e) {
            reject({});
        }
    })
}
//tim tran cap keo
let getTranByIdClbKhach = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tran = await db.Tran.findOne({
                where: {
                    idDoikhach: { [Op.is]: null } // timkiem voi dieu kien NULL
                },
                raw: true,
            })
            if (tran) {
                resolve(tran)
            }
        } catch (e) {
            reject({});
        }
    })
}
//tao moi tran
let CreateGameSolo = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            await db.Tran.create({
                type: 'g1',
                //idDoinha: hassPass,
                //gio: Data.time,
                //ngay: Data.day,
            })
            resole("ok");
        } catch (e) {
            reject(e);
        }
    })
}
//update tran
let updatetranById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tran = await gettranById(data.id);
            if (tran) {
                tran.ten = data.ten;
                tran.sdt = data.sdt;
                tran.role = data.role;
                tran.email = data.email;
                tran.ngaysinh = data.ngaysinh;
                tran.cannang = data.cannang;
                tran.chieucao = data.chieucao;
                tran.vitri = data.vitri;
                await tran.save();
                resolve();

            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}
//xoa tran
let deletetranById = (tranId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tran = await gettranById(tranId);
            if (tran) {
                await tran.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
//update tran khi bam tham gia cap keo
let updateIdDoikhach = (idTran) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tran = await db.Tran.findOne({
                where: { id: idTran },
                //raw: true,
            })
            let user = await s_user.getIdClbById(2);
            let idDoiKhach = user.r_idClb.id;
            if (tran) {
                tran.idDoikhach = idDoiKhach;
                tran.type = "d";
                await tran.save();
                resolve("abc");

            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

export { getTranByIdClbKhach, getAllTran, CreateGameSolo, updateIdDoikhach }