import db from '../models/index';
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
let createtran = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            await db.tran.create({
                ten: data.ten,
                sdt: data.sdt,
                mk: hassPass,
                role: data.role,
                email: data.email,
                ngaysinh: data.ngaysinh,
                gioitinh: data.gioitinh === "1" ? true : false,
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
// bam mat khau

export { getTranByIdClbKhach, getAllTran }