    // Loading in our modules
const fs = require("fs"); // filesystem module
const path = require("path"); // path module
const Sequelize = require("sequelize"); // sequelize module to establish our connection

let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; // Creates our sequelize connection to MySQL DB
db.Sequelize = Sequelize; // Creates a property of our loaded Sequelize Module

// Syncing models to generate tables in
// MySQL database if not already defined
db.sequelize.sync().then(() => {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

module.exports = db;