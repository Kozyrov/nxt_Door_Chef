module.exports = (sequelize, DataTypes) => {
    let Hours = sequelize.define("hours", {
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        open: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        close: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Hours
};