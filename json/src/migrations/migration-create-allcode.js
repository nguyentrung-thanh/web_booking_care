'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('allcode', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            key: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            valueEn: {
                type: Sequelize.STRING
            },
            valueVi: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE // Đã sửa thành DATE viết hoa
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE // Đã sửa thành DATE viết hoa
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('allcode');
    }
};