const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const {
  getAllBooks,
  createBook,
  deleteBook,
  getBook,
  updateBook,
} = require("../controllers/books");

router.route("/").get(getAllBooks);
router.route("/create").post(authenticateUser, createBook);
router
  .route("/:id")
  .get(getBook)
  .delete(authenticateUser, deleteBook)
  .patch(authenticateUser, updateBook);

module.exports = router;
