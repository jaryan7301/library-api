const Sequelize = require("sequelize");

const sequelize = new Sequelize("library_db", "root", "031203", {
  host: "localhost",
  dialect: "mysql"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model")(sequelize, Sequelize);

module.exports = db;
