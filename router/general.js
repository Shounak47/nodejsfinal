const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  //console.log(req);

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let myPromise=new Promise((resolve,reject) => {
    res.send(JSON.stringify(books,null,4));
    resolve("Promise resolved");
    });
  //res.send(JSON.stringify(books,null,4));
  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let myPromise=new Promise((resolve,reject) => {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
    });
  //res.send(JSON.stringify(books,null,4));
  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  });

  //const isbn = req.params.isbn;
  //res.send(books[isbn]);
});
 
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  let myPromise=new Promise((resolve,reject) => {
    const author=req.params.author;
    let response={"booksbyauthor":[]}
    for(const isbn in books){
        if(books[isbn]["author"]==author){
            let item={"isbn":isbn,"title":books[isbn]["title"],"reviews":books[isbn]["reviews"]};
            response["booksbyauthor"].push(item);
        }
    }
    res.send(response);

    resolve("Promise resolved");
    });
  //res.send(JSON.stringify(books,null,4));
  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })


//   const author=req.params.author;
//   let response={"booksbyauthor":[]}
//   for(const isbn in books){
//       if(books[isbn]["author"]==author){
//           let item={"isbn":isbn,"title":books[isbn]["title"],"reviews":books[isbn]["reviews"]};
//           response["booksbyauthor"].push(item);
//       }
//   }
//   res.send(response);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  let myPromise=new Promise((resolve,reject) => {
    const title=req.params.title;
  let response={"booksbytitle":[]}
  for(const isbn in books){
      if(books[isbn]["title"]==title){
          let item={"isbn":isbn,"author":books[isbn]["author"],"reviews":books[isbn]["reviews"]};
          response["booksbytitle"].push(item);
      }
  }
  res.send(response);
    resolve("Promise resolved");
    });
  //res.send(JSON.stringify(books,null,4));
  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })


//   const title=req.params.title;
//   let response={"booksbytitle":[]}
//   for(const isbn in books){
//       if(books[isbn]["title"]==title){
//           let item={"isbn":isbn,"author":books[isbn]["author"],"reviews":books[isbn]["reviews"]};
//           response["booksbytitle"].push(item);
//       }
//   }
//   res.send(response);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn=req.params.isbn;
  return res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
