import db from '../models/index';
//lay tat ca san
let getAllPitch = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let pitch = await db.Pitch.findAll({
                attributes: ['id', 'name', 'type', 'status'],
                raw: true,
            });
            resData = {
                code: 0,
                message: "OK",
                pitch: pitch
            }
            console.log(resData)
            resolve(resData);
        } catch (e) {
            reject(e);
        }
    })
}
//lay cac san co trang trai = 1 de dat san
let getPitch = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let pitch = await db.Pitch.findAll({
                attributes: ['id', 'name', 'type', 'status'],
                where: { status: 1 },
                raw: true,
            });
            resData = {
                code: 0,
                message: "OK",
                pitch: pitch
            }
            console.log(resData)
            resolve(resData);
        } catch (e) {
            reject(e);
        }
    })
}
//update user

let deletePitch = (idPitch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let pitch = await db.Pitch.findOne({ where: { id: idPitch } });
            if (pitch) {
                await pitch.destroy();
            }
            let resData = {
                code: 0,
                message: "Xoa san thanh cong"
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
let updatePitch = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let pitch = await db.Pitch.findOne({ where: { id: data.idPitch } });
            if (pitch) {
                pitch.status = data.status
                await pitch.save();
            }
            let resData = {
                code: 0,
                message: "Cap nhat trang thai thanh cong"
            }
            resolve(resData);
        } catch (e) {
            reject(e);
        }
    })
}
export { getAllPitch, getPitch, deletePitch, updatePitch }