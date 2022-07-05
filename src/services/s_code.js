import db from '../models/index';
let getKeyT = (hours) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Code.findOne({
                where: { value: hours },
                raw: true,
            })
            resolve(user.keyT);
        } catch (e) {
            reject(e);
        }
    })
}
export { getKeyT }