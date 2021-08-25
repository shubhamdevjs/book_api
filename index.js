const { request, response } = require("express");
const express= require("express");
const { Book } = require("./database");
const ourApp= express();

const Database=require("./database")


ourApp.get("/", (request,response)=>{
    response.json("hello world I m working happily");
});

// Route       = /book
// Descriptin  = to get all books
// Access      = Public
// Method      = GET 
// params      = none
// Body        = none
ourApp.get("/book",(request, response)=>{
    return response.json({books:Database.Book});
});

// Route       = /book/bookID
// Descriptin  = to get a book by ISBN
// Access      = Public
// Method      = GET 
// params      = bookID
// Body        = none
ourApp.get("/book/:bookID",(request,response)=>{
    const getBook=Database.Book.filter(
        (book) => book.ISBN===request.params.bookID);
    response.json({book:getBook});
});

// Route       = /book/c/:category
// Descriptin  = to get a book by type of category
// Access      = Public
// Method      = GET 
// params      = category
// Body        = none

ourApp.get("/book/c/:category",(request,response)=>{
    const getCategory=Database.Book.filter((book)=>
        book.category.includes(request.params.category)
    );

    return response.json({book:getCategory});  
});

// Route       = /book/a/author
// Descriptin  = to get a book by author id
// Access      = Public
// Method      = GET 
// params      = author id
// Body        = none
 
// ourApp.get("/book/a/:authors",(request, response)=>{
//     const getAuthor=Database.Book.filter((book)=>
//     book.authors.includes(request.params.authors)
//     );
//     return response.json({book:getAuthor});
// });
ourApp.get("/author",(request,response) => {
    return response.json({ author: Database.author });
});

ourApp.listen(4000, ()=>console.log("server is running")); 