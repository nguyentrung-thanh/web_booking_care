import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);


let handletUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // user already exist
                let user = await db.User.findOne({ // Sửa db.user thành db.User
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },

                    raw: true // Thêm dòng này để trả về dữ liệu thuần (object phẳng) nếu cần
                });
                if (user) {
                    // compare password (dùng biến password thay vì chuỗi cứng "password")
                    let check = await bcrypt.compareSync(password, user.password);

                    // let check = true
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'; // Sửa dấu phẩy thành dấu chấm phẩy ở đây
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Plz try other email!`;
            }
            resolve(userData);

        } catch (e) {
            reject(e);
        }
    });
};


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'abc';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'] // Exclude the password field from the result
                    }

                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'] // Exclude the password field from the result
                    }
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email is exist
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used, Plz try another email!'
                });
                return;
            }
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
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e);
        }
    })
};
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
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    message: 'The user is not exist.'
                });
                return;
            }
            await db.User.destroy({
                where: { id: userId }
            });


            resolve({
                errCode: 0,
                message: 'The user has been deleted successfully.'
            });

        } catch (e) {
            reject(e);
        }
    });
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                });
                return;
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                await db.User.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                }, {
                    where: { id: data.id }
                });


                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found!'
                });

            }


        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
export default {
    handletUserLogin: handletUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    hashserPassword: hashserPassword,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
};