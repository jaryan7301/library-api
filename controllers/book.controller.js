// controllers/book.controller.js
const db = require("../models");
const Book = db.books;

exports.create = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

exports.findOne = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  book ? res.json(book) : res.status(404).send("Book not found");
};

exports.update = async (req, res) => {
  const result = await Book.update(req.body, { where: { id: req.params.id } });
  res.send(result[0] ? "Updated" : "Not Found");
};

exports.delete = async (req, res) => {
  const result = await Book.destroy({ where: { id: req.params.id } });
  res.send(result ? "Deleted" : "Not Found");
};
