const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
let books = require("./router/booksdb.js");

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

app.get('/books', (req, res) => {
    res.json(books);
});
app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    if(books[isbn]){
        res.json(books[isbn]);
     } else{
        res.status(404).json({message:"Book not found"})
       }
});
app.get('/books/author/:author', (req, res) => {
    const author = req.params.author;
    const bookByAuthor = Object.values(books).filter(book=> book.author === author);
    if(bookByAuthor.length>0){
      res.json(bookByAuthor);
       } else {
       res.status(404).json({message:"Book not found with that author"})
       }
});
app.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    const bookByTitle = Object.values(books).filter(book => book.title === title);
     if(bookByTitle.length>0){
       res.json(bookByTitle);
     }
       else {
       res.status(404).json({message:"Book not found with that title"})
       }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));