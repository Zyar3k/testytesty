const Book = require("../models/Book");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort("createdAt");
  res.status(StatusCodes.OK).json(books);
};

const getBook = async (req, res) => {
  const {
    //   user: { userId }, // optional, later
    params: { id: bookId },
  } = req;

  const book = await Book.findOne({ _id: bookId });
  if (!book) {
    throw new NotFoundError(`Book with id ${bookId} not found`);
  }
  res.status(StatusCodes.OK).json(book);
};

const createBook = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  const {
    body: {
      title,
      author,
      page,
      link,
      list,
      readed,
      available,
      desc,
      adminRating,
      rating,
    },
    params: { id: bookId },
  } = req;

  if (!title) {
    throw new BadRequestError("Title is required");
  }

  const book = await Book.findOneAndUpdate(
    { _id: bookId },
    {
      title,
      author,
      page,
      link,
      list,
      readed,
      available,
      desc,
      adminRating,
      rating,
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const {
    params: { id: bookId },
  } = req;

  const book = await Book.findOneAndDelete({ _id: bookId });
  if (!book) {
    throw new NotFoundError(`Book with id ${bookId} not found`);
  }
  res.status(StatusCodes.OK).json(`Book with id ${bookId} deleted`);
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
