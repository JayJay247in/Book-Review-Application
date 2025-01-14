const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    if(users.find(user=>user.username === username))
    return true
  return false
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      }
      else {
          return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({message: "Invalid username or password"});
    }
     let accessToken = jwt.sign({
        data: username
        }, 'access', { expiresIn: 60 * 60 });

     req.session.authorization = {
        accessToken
    }
    return res.status(200).json({message: "User successfully logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
   const isbn = req.params.isbn;
    const review = req.query.review;
   const username = req.user.data;

   if(!review){
         return res.status(400).json({message:"Review message is required"});
   }
   if (books[isbn]) {
    if(!books[isbn].reviews){
        books[isbn].reviews = {};
      }
        books[isbn].reviews[username] = review;
       res.status(200).send("Review successfully added/updated");
   }
    else {
        res.status(404).json({ message: "Book not found." });
    }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.data;
    if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
       delete books[isbn].reviews[username];
        res.status(200).send('Review deleted.');
    } else {
      res.status(404).json({ message: "Review not found." });
    }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;