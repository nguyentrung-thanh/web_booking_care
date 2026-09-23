'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Clinics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            image: {
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
        await queryInterface.dropTable('Clinics');
    }
};