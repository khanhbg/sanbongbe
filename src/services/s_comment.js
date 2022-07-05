import db from '../models/index';
const { Op } = require("sequelize");
//lay tat ca tran
let getAllComment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let comment = await db.Comment.findAll({
                attributes: ['id', 'star', 'content'],
                order: [['id', 'DESC']],
                limit: 5,
                include: [
                    {
                        model: db.User,
                        as: 'r_idUser',
                        attributes: ['id', 'nameTeam'],

                    },
                ],
                raw: true,
            });
            if (comment) {
                resData.code = 0;
                resData.message = "OK";
                resData.comment = comment;
                resolve(resData);
            } else {
                resData.code = 1;
                resData.message = "Loi DB";
                resolve(resData);
            }

        } catch (e) {
            reject(e);
        }
    })
} //ok
//tao comment moi
let createComment = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let resData = {};
            let star = data.star;
            if (!star) {
                star = 0;
            }
            await db.Comment.create({
                idUser: data.idUser,
                star: data.star,
                content: data.content
            })
            resData.code = 0;
            resData.message = 'ok';
            resole(resData);
        } catch (e) {
            resData.code = 7;
            resData.message = 'loi server';
            reject(resData);
        }
    })
}

//xoa tran
let deleteComment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let comment = await db.findOne({
                where: {
                    id: id
                },
                raw: true,
            });
            if (comment) {
                await comment.destroy();
                resData.code = 0;
                resData.message = 'Xoa thanh cong';
                resolve(resData);
            } else {
                resData.code = 1;
                resData.message = 'Loi DB';
                resolve(resData);
            }
        } catch (e) {
            reject(e);
        }
    })
}
// bam mat khau

export { getAllComment, createComment, deleteComment }