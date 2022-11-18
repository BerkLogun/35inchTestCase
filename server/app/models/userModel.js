module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
        },
        email: {
        type: Sequelize.STRING,
        allowNull: false
        },
        password: {
        type: Sequelize.STRING,
        allowNull: false
        },
        admin: {
        type: Sequelize.BOOLEAN,
        },
        refreshToken: {
        type: Sequelize.STRING
        }
    });
     
    return User;
};
