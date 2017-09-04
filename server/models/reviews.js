module.exports = (sequelize, DataTypes) => {
    let Reviews = sequelize.define("reviews", {
        chef_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Reviews
};