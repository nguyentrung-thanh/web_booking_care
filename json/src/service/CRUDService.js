import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => { // Đã sửa rejct thành reject
        try {
            let hashPasswordFromBcrypt = await hashserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('ok create a new user succed!')
        } catch (e) {
            reject(e);
        }
    });
}
let hashserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // bcrypt.hashSync là đồng bộ, có thể dùng trực tiếp hoặc đổi sang bcrypt.hash kèm await
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Thêm await và dùng đúng tên biến users
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resole(allUsers);
            } else {
                resole();
            }


        } catch (e) {
            console.log(e);
        }
    })
}
let deleteCRUDById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Xóa trực tiếp bằng điều kiện where
            await db.User.destroy({
                where: { id: userId }
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
export default {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteCRUDById: deleteCRUDById,
}