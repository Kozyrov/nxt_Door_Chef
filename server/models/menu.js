module.exports = (sequelize, DataTypes) => {
    let Menu = sequelize.define("menus", {
        menu_item_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foodType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        chef_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Menu
};