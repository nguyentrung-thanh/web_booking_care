import db from '../models/index';
import CRUDService from "../service/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })

    } catch (e) {
        console.log(e)
    }
    return res.render('homepage.ejs');
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');

}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('post crud form server ');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        return res.send('Not found a user');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    console.log('--- ID nhan duoc de xoa la: ---', id); // Thêm dòng này để kiểm tra
    if (id) {
        await CRUDService.deleteCRUDById(id);

        // 1. Phải gọi lấy lại danh sách user mới nhất sau khi xóa
        let allUser = await CRUDService.getAllUser();

        // 2. Truyền biến allUser vào render bảng
        return res.render('displayCRUD.ejs', {
            dataTable: allUser
        })
    }
    else {
        return res.send('Not found User');
    }
}

export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}