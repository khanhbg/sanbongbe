import db from '../models/index';
import * as s_user from "./s_user"
import * as s_code from "../services/s_code"
const { Op, Sequelize, NUMBER, HasMany } = require("sequelize");

//tim tran cap keo
let getMatchSolo = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let match = await db.Match.findAll({
                where: {
                    idGuestTeam: { [Op.is]: null }, // timkiem voi dieu kien NULL
                    keyT: 1,
                    isComplete: 0
                },
                attributes: ['id', 'hours', 'day', 'goalHomeTeam', 'goalGuestTeam', 'keyT'],
                include: [
                    {
                        model: db.User,
                        as: "r_idHomeTeam",
                        attributes: ['nameTeam', 'id', 'pointRank'],
                    }
                ],
                raw: true,
            })
            if (match) {
                resData.code = 0;
                resData.message = 'OK';
                resData.match = match;
                resolve(resData)
            } else {
                resData.code = 0;
                resData.message = 'Loi DB';
                resolve(resData)
            }
        } catch (e) {
            reject(e);
        }
    })
}//ok
//tao moi tran
let CreateNewMatch = (data) => {
    return new Promise(async (resole, reject) => {
        let resData = {};
        try {
            console.log(data)
            let solo = data.solo;
            let keyT;
            let idGuestTeam;
            let deposit = 0;
            let day = new Date(data.day);
            let vip = await s_user.getVipUser(data.idUser);
            let money = vip.money;
            console.log('1: ', idGuestTeam);
            //gan deoposit
            // if (vip.vip != 1) {
            //     if (vip.money < 50000) {
            //         resData = {
            //             code: 5,
            //             message: 'Tài khoản không đặt tiền để đặt cọc, vui lòng nạp thêm tiền'
            //         }
            //         resole(resData)
            //     } else {
            //         deposit = 50000;
            //         money = vip.money - deposit;
            //     }
            // }
            //gan kieu tran solo hoac khong
            if (solo) {
                keyT = "1"
            } else {
                keyT = "0";
                idGuestTeam = data.idUser;
            }
            //let keyT = await s_code.getKeyT(data.hours);
            //kiem tra xem co tran o san do, gio do chua, neu khong thi tao
            let match = await db.Match.findOrCreate({
                where: {
                    idPitch: data.idPitch,
                    hours: data.hours,
                    day: day
                },
                defaults: {
                    keyT: keyT,
                    idPitch: data.idPitch,
                    idHomeTeam: data.idUser,
                    idGuestTeam: idGuestTeam,
                    hours: data.hours,
                    day: day,
                    deposit: deposit,
                    isComplete: 0
                }
            })
            if (match[1]) {
                await s_user.updateMoney(data.idUser, money)
                resData = {
                    code: 0,
                    message: 'Tao tran dau thanh cong'
                }
                resole(resData);
            } else {
                resData = {
                    code: 4,
                    message: 'Sân đã được thuê vào khung giờ này, xin vui lòng chọn sân khác hoặc khung giờ khác'
                }
                resole(resData);
            }
            //update tien khi thue san

        } catch (e) {
            resData = {
                code: 7,
                message: 'Loi DB'
            }
            reject(resData);
        }
    })
}//ok
//admin update ti so
let updateMatchById = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = await db.Match.findOne({
                where: { id: id },
                //raw: true,
            })
            if (match) {

                match.goalHomeTeam = data.goalHomeTeam;
                match.goalGuestTeam = data.goalGuestTeam;
                await match.save();
            } else {
                resolve();
            }


        } catch (e) {
            // resData.code = '5';
            // resData.message = 'Loi server';
            // reject(resData);
            reject(e)
        }
    })
}//ok
//xoa tran
let deleteMatchById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let match = await db.Match.findOne({
                where: { id: id },
                //raw: true,
            })
            if (match) {
                await match.destroy();
                resData.code = "0";
                resData.message = "Huy tran thanh cong"
            } else {
                resData.code = "1";
                resData.message = "loi DB"
            }
            resolve(resData);
        } catch (e) {
            reject(e);
        }
    })
} //ok
//update tran khi bam tham gia cap keo
let joinMatchSolo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let match = await db.Match.findOne({
                where: { id: data.idMatch },
                //raw: true,
            })
            console.log(match)
            //let idGuestTeam = '1';
            if (match) {
                if (match.idGuestTeam === null) {
                    match.idGuestTeam = data.idUser;
                    await match.save();
                    resData.code = 0;
                    resData.message = 'ok';
                    resolve(resData);
                } else {
                    resData.code = 5;
                    resData.message = 'Trận đấu đã có đối thủ';
                    resolve(resData);
                }

            } else {
                resData.code = 1;
                resData.message = 'Tran dau da bi huy'
                resolve(resData);
            }
        } catch (e) {
            reject(e);
        }
    })
}//ok join tran

//dem so tran theo ngay
let countNumberMatch = (day, hours) => {
    return new Promise(async (resole, reject) => {
        try {
            let resData = {};
            let numberMatch = await db.Match.count({
                where: {
                    hours: hours,
                    day: day
                }
            })
            resData.code = '0'
            resData.message = 'ok';
            resData.numberMatch = numberMatch;
            resole(resData);
        } catch (e) {
            reject(e)
        }
    })
}
//lat tran va code
let getSearchMatch = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let match;
            if (data.idPitch) {
                match = await db.Code.findAll({
                    attributes: ['value'],
                    where: {
                        type: 'match'
                    },
                    order: [['VALUE', 'ASC']],
                    include: [
                        // {
                        //     model: db.Match,
                        //     as: 'codeHours',
                        //     attributes: ['id'],
                        //     where: {
                        //         day: data.day,
                        //         idPitch: data.idPitch
                        //     },
                        //     include: [
                        //         {
                        //             model: db.Pitch,
                        //             as: "r_idPitch",
                        //             attributes: ['name', 'type', 'status'],
                        //         },
                        //     ],
                        //     required: false
                        // },
                        {
                            model: db.Services,
                            as: 'priceServices',
                            attributes: ['price'],
                        }
                    ],
                    // group: ['value'],
                    raw: true,
                    nest: true,
                })
            } else {
                match = await db.Code.findAll({
                    attributes: ['value'],
                    where: {
                        type: 'match'
                    },
                    order: [['VALUE', 'ASC']],
                    include: [
                        // {
                        //     model: db.Match,
                        //     as: 'codeHours',
                        //     attributes: ['id'],
                        //     where: {
                        //         day: data.day,
                        //     },
                        //     required: false
                        // },
                        {
                            model: db.Services,
                            as: 'priceServices',
                            attributes: ['price'],
                        }
                    ],
                    raw: true,
                    nest: true,
                })
            }
            for (let index = 0; index < match.length; index++) {
                const element = match[index];
                element.codeHours = await db.Match.findAll({
                    where: {
                        hours: element.value,
                        day: data.day
                    },
                    attributes: ['idPitch']
                })
                element.numberMatch = element.codeHours.length
            }
            console.log(data.idPitch)

            if (match) {
                resData.code = '0';
                resData.message = 'OK';
                resData.match = match;
                resolve(resData)
            } else {
                resData.code = '1';
                resData.message = 'Loi DB';
                resolve(resData)
            }
        } catch (e) {
            reject(e);
        }
    })
}//ok
// lich su tran dau user theo hoan thanh hay chua
let getHistoryUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //yeu cau tran chua hoan thanh
            let resData = {};
            let isComplete;
            let fDay = new Date(data.fDay);
            let tDay = new Date(data.tDay);
            // gan trang thai tran da hoan thanh chua
            if (data.status == 0) {
                isComplete = 0
            } else {
                isComplete = 1
            }
            //tim kiem voi id va trang thai
            let match = await db.Match.findAll({
                where: {
                    isComplete: isComplete,
                    [Op.or]: [{ idHomeTeam: data.idUser }, { idGuestTeam: data.idUser }],
                    //day: { [Op.between]: [fDay, tDay] }
                },
                order: [['day', 'DESC'], ['hours', 'DESC']],
                attributes: ['hours', 'day', 'goalHomeTeam', 'goalGuestTeam', 'isComplete', 'deposit'],
                include: [
                    {
                        model: db.User,
                        as: "r_idHomeTeam",
                        attributes: ['nameTeam', 'id'],
                    },
                    {
                        model: db.User,
                        as: "r_idGuestTeam",
                        attributes: ['nameTeam', 'id'],
                    },
                    {
                        model: db.Pitch,
                        as: "r_idPitch",
                        attributes: ['name', 'type', 'status'],
                    },
                    {
                        model: db.Code,
                        as: "codeHours",
                        attributes: ['keyT'],
                        include: [
                            {
                                model: db.Services,
                                as: "priceServices",
                                attributes: ['price'],
                            }
                        ]
                    },
                ],
                raw: true,
                //nest: true,
            })
            if (match) {
                resData.code = 0;
                resData.message = 'OK';
                resData.match = match;
                resolve(resData)
            } else {
                resData.code = 7;
                resData.message = 'Loi DB';
                resolve(resData)
            }
        } catch (e) {
            let resData = {
                code: 8,
                message: 'Loi server'
            }
            reject(resData);
        }
    })
}//ok

//cap nhat tran
let getShowMatchAdmin = (day) => {
    return new Promise(async (resolve, reject) => {
        try {
            //yeu cau tran chua hoan thanh
            let resData = {};
            let match = await db.Match.findAll({
                where: {
                    day: day,
                    isComplete: 0
                    //goalHomeTeam: { [Op.is]: null }, //chua duoc cap nhat ti so
                },
                order: [['hours', 'ASC']],
                attributes: ['id', 'hours', 'goalHomeTeam', 'goalGuestTeam', 'deposit'],
                include: [
                    {
                        model: db.User,
                        as: "r_idHomeTeam",
                        attributes: ['nameTeam'],
                    },
                    {
                        model: db.User,
                        as: "r_idGuestTeam",
                        attributes: ['nameTeam'],
                    },
                    {
                        model: db.Pitch,
                        as: "r_idPitch",
                        attributes: ['name', 'type', 'status'],
                    },
                    {
                        model: db.Code,
                        as: "codeHours",
                        attributes: ['keyT'],
                        include: [
                            {
                                model: db.Services,
                                as: "priceServices",
                                attributes: ['price'],
                            }
                        ]
                    },

                ],
                raw: true,
                //nest: true,
            })
            if (match) {
                resData.code = '0';
                resData.message = 'OK';
                resData.match = match;
                resolve(resData)
            } else {
                resData.code = '1';
                resData.message = 'Loi DB';
                resolve(resData)
            }

        } catch (e) {
            reject(e);
        }
    })
}//ok

let updateMatchAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let match = await db.Match.findOne({
                where: { id: data.idMatch },
                //raw: true,
            })
            if (match) {
                let homeTeam = await s_user.getVipUser(match.idHomeTeam);
                let guestTeam = await s_user.getVipUser(match.idGuestTeam);
                let money = homeTeam.money;
                let pointRankHomeTeam = 0; // diem rank cong them sau tran dau
                let pointRankGuestTeam = 0;
                if (data.typePayment == 1) {
                    if (money > data.payment) {
                        money = money - data.payment;
                        await s_user.updateMoney(match.idHomeTeam, money);
                    } else {
                        resData.code = "5";
                        resData.message = "Tai khoan khong du tien, xin vui long nap them"
                        resolve(resData);
                    }
                }
                match.goalHomeTeam = data.goalHomeTeam;
                match.goalGuestTeam = data.goalGuestTeam;
                match.isComplete = 1;
                await match.save();
                let setwin = data.goalHomeTeam - data.goalGuestTeam;
                let setRank = homeTeam.pointRank - guestTeam.pointRank;
                // set thang thua, cong pointRank
                if (match.keyT == 1) {
                    if (setwin > 0) {
                        if (setRank == 0) {
                            pointRankHomeTeam = 20
                            pointRankGuestTeam = -20
                        } else if (setRank > 0) {
                            pointRankHomeTeam = 15
                            pointRankGuestTeam = -10
                        } else {
                            pointRankHomeTeam = 25
                            pointRankGuestTeam = -20
                        }
                    } else if (setwin < 0) {
                        if (setRank == 0) {
                            pointRankHomeTeam = -20
                            pointRankGuestTeam = 20
                        } else if (setRank > 0) {
                            pointRankHomeTeam = -20
                            pointRankGuestTeam = 25
                        } else {
                            pointRankHomeTeam = -10
                            pointRankGuestTeam = 15
                        }
                    } else {
                        if (setRank == 0) {
                            pointRankHomeTeam = 10
                            pointRankGuestTeam = 10
                        } else if (setRank > 0) {
                            pointRankHomeTeam = 5
                            pointRankGuestTeam = 10
                        } else {
                            pointRankHomeTeam = 10
                            pointRankGuestTeam = 5
                        }
                    }
                    await s_user.updatePointRank(match.idHomeTeam, pointRankHomeTeam)
                    await s_user.updatePointRank(match.idGuestTeam, pointRankGuestTeam)
                }

                resData.code = "0";
                resData.message = "Cap nhat thanh cong"
                resolve(resData);

            } else {
                await s_user.updateMoney(idHomeTeam, moneyOld);
                resData.code = "1";
                resData.message = "Tran khong ton tai"
                resolve(resData);
            }
        } catch (e) {
            reject(e)
        }
    })
} //ok
//lay id user 
let getIdUser = (idMatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = await db.Match.findOne({
                where: {
                    id: idMatch
                },
                attributes: ['id', 'idHomeTeam', 'idGuestTeam'],
                raw: true,
            })

            if (match) {
                resolve(match.idHomeTeam)
            } else {
                resolve()
            }

        } catch (e) {
            reject(e);
        }
    })
}//ok

//backup searchMatch
let SearchMatch = (data) => {
    return new Promise(async (resolve, reject) => {
        let resData = {};
        try {
            let match = null;
            if (data.idPitch != null) {
                match = await db.Code.findAll({
                    attributes: ['value'],
                    where: {
                        type: 'match'
                    },
                    order: [['VALUE', 'ASC']],
                    include: [
                        {
                            model: db.Match,
                            as: 'codeHours',
                            attributes: ['id'],
                            where: {
                                day: data.day,
                                idPitch: data.idPitch
                            },
                            include: [
                                {
                                    model: db.Pitch,
                                    as: "r_idPitch",
                                    attributes: ['name', 'type', 'status'],
                                },
                            ],
                            required: false
                        },
                        {
                            model: db.Services,
                            as: 'priceServices',
                            attributes: ['price'],
                        }
                    ],
                    // group: ['value'],
                    raw: true,
                    nest: true,
                })
            } else {
                match = await db.Code.findAll({
                    attributes: ['value', [Sequelize.fn('count', Sequelize.col('hours')), 'numberMatch']],
                    where: {
                        type: 'match'
                    },
                    order: [['VALUE', 'ASC']],
                    include: [
                        {
                            model: db.Match,
                            as: 'codeHours',
                            attributes: ['id'],
                            where: {
                                day: data.day
                            },
                            // include: [
                            //     {
                            //         model: db.Pitch,
                            //         as: "r_idPitch",
                            //         attributes: ['name', 'type', 'status'],
                            //     },
                            // ],
                            required: false
                        },
                        {
                            model: db.Services,
                            as: 'priceServices',
                            attributes: ['price'],
                        }
                    ],
                    group: ['value'],
                    raw: true,
                    nest: true,
                })
            }
            if (match) {
                resData.code = '0';
                resData.message = 'OK';
                resData.match = match;
                resolve(resData)
            } else {
                resData.code = '1';
                resData.message = 'Loi DB';
                resolve(resData)
            }
        } catch (e) {
            resData.code = '7';
            resData.message = 'Loi Server';
            reject(e);
        }
    })
}//ok
export {
    getMatchSolo, CreateNewMatch, joinMatchSolo, countNumberMatch,
    getSearchMatch, updateMatchById, getHistoryUser, getShowMatchAdmin,
    updateMatchAdmin, deleteMatchById, getIdUser, SearchMatch
}