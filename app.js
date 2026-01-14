/**
 * RMIT University Vietnam
 * Course: COSC3060 Web Programming Studio
 * Semester: 2025B
 * Assessment: Fullstack in-class Lab Test
 * Author: Your names (e.g. Nguyen Van Minh)
 * ID: Your student ids (e.g. s1234567)
 * Acknowledgement: Acknowledge the resources that you use here.
 */

// Declare packages used for this server file
const express = require("express");
require("dotenv").config();

// Setup server
const app = express();
require("./db/mongoose");
// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
// Set view engine to ejs
app.set("view engine", "ejs");
// Setup static files location
app.use(express.static("public"));

//Call the models
const { Book, ReadingList } = require("./db/bookModel");

/** Routes */
// Homepage endpoint that when accessed will produce a random reading list for a week
app.get("/", async function (req, res) {
  try {
    const count = await ReadingList.countDocuments();
    const random = Math.floor(Math.random() * count);
    const readingList = await ReadingList.findOne().skip(random);
    console.log(readingList.name);
    res.render("list", {
      readingList,
      pageStyles: ["/css/profile.css", "/css/header.css"],
    });
  } catch (error) {
    res.status(500).send("Error retrieving reading list");
  }
});

// Book endpoint that when accessed will show detail information about a book and related books found in the database
app.get("/book/:title", async function (req, res) {
  const bookTitle = req.params.title;
  const book = await Book.findOne({
    title: { $regex: new RegExp("^" + bookTitle + "$", "i") },
  }).lean();
  if (!book) {
    return res.status(404).render("404", { message: "Book not found" }); // Hoặc res.send
  }
  const relatedBooks = await Book.find({
    _id: { $ne: book._id }, // Loại trừ cuốn hiện tại
  }).lean();
  console.log(`Book title requested: ${bookTitle}`);
  // For now, just render the book page without dynamic data
  res.render("book", {
    book,
    relatedBooks,
    pageStyles: ["/css/book.css", "/css/header.css"],
  });
});

// Port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
