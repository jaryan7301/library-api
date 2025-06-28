// models/book.model.js
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("book", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    publishedYear: {
      type: Sequelize.INTEGER
    },
    genre: {
      type: Sequelize.STRING
    }
  });
};
