import db from '../models/index';
//lay tat ca user
let getAllBaiviet = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let baiviet = await db.Baiviet.findAll({
                raw: true,
            });
            resolve(baiviet);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
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
            let user = await getUserById(userId);
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
export { getAllBaiviet }