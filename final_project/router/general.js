const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
   if(users.find(user => user.username === username)){
       return res.status(400).json({message: "Username already exists"})
   }
   users.push({
    "username": username,
    "password": password
    });
    return res.status(201).json({ message: "User registered successfully." });
});


/*// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn]){
      res.json(books[isbn]);
  } else{
       res.status(404).json({message: "Book not found"});
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const bookByAuthor = Object.values(books).filter(book=> book.author === author);
   if(bookByAuthor.length >0 ){
        res.json(bookByAuthor);
   }
   else {
    res.status(404).json({message:"Book not found with that author"})
   }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const bookByTitle = Object.values(books).filter(book => book.title === title);
    if(bookByTitle.length >0 ){
         res.json(bookByTitle);
    }
    else {
         res.status(404).json({message: "Book not found with that title"})
    }
});*/

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try{
       const response = await axios.get('http://localhost:5000/books')
       res.json(response.data)
    }
    catch(error){
        res.status(500).json({message: "Error fetching books"})
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
     const isbn = req.params.isbn;
    try {
         const response = await axios.get(`http://localhost:5000/books/${isbn}`)
        if(response.data){
            res.json(response.data)
        }
        else {
            res.status(404).json({message: "Book not found"});
        }
    }
    catch (error){
        res.status(404).json({message:"Book not found"});
    }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
   const author = req.params.author;
    try{
         const response = await axios.get(`http://localhost:5000/books/author/${author}`);
         if(response.data){
            res.json(response.data);
         }
         else {
            res.status(404).json({message:"Book not found with that author"})
          }
    }
    catch(error){
       res.status(404).json({message:"Book not found with that author"})
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:5000/books/title/${title}`)
          if(response.data){
            res.json(response.data);
         }
        else {
           res.status(404).json({message:"Book not found with that title"})
         }
        }
    catch(error){
           res.status(404).json({message:"Book not found with that title"})
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    if(books[isbn] && books[isbn].reviews){
        res.json(books[isbn].reviews);
    } else{
        res.status(404).json({message:"Reviews not found for this isbn"});
    }
});


module.exports.general = public_users;