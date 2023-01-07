require("dotenv").config();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6tpkm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = require("./db/connect");
const Book = require("./models/book");

// const jsonBooks = require("./dbtest.json");
const jsonBooks = require("./finalDB.json");

const start = async () => {
  try {
    await connectDB(mongoUri);
    await Book.deleteMany();
    await Book.create(jsonBooks);
    console.log("Success! You update DB.");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
