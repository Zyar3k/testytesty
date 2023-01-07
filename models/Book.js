const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
      maxlength: 150,
    },
    author: {
      name: {
        type: String,
        maxlength: 30,
      },
      lastName: {
        type: String,
        required: [true, "Please enter lastName of author"],
        maxlength: 20,
      },
    },
    list: {
      type: Array,
      required: [true, "Please enter a list"],
    },
    page: {
      type: Number,
      required: [true, "Please enter a page number"],
      maxlength: 10,
    },
    link: {
      type: String,
      required: [true, "Please enter a link"],
    },
    readed: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    adminRating: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    rating: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
