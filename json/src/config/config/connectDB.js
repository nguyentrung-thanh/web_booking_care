const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (điền đúng tên database, user, password của bạn)
const sequelize = new Sequelize('hoidanit', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  logging: false // Tắt log các câu lệnh SQL dài dòng ở terminal cho đỡ rối
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connectDB;