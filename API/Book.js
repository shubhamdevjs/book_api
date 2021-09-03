// const BookModel = require("../schema/book");
// const Router = require(express).Router();

// // const authorModel = require("../schema/author");


// // Route       = /book
// // Descriptin  = to get all books
// // Access      = Public
// // Method      = GET    
// // params      = none
// // Body        = none
// // Router.get("/book", async(request, response)=>{
// //     const getAllBooks = await BookModel.find();

// //     return response.json(getAllBooks); 
// // });

// // // Route       = /book/bookID
// // // Descriptin  = to get a book by ISBN
// // // Access      = Public
// // // Method      = GET 
// // // params      = bookID
// // // Body        = none
// // Router.get("/book/:bookID",(request,response)=>{
// //     const getBook=Database.Book.filter(
// //         (book) => book.ISBN===request.params.bookID);
// //     response.json({book:getBook});
// // });

// // // Route       = /book/c/:category
// // // Descriptin  = to get a book by type of category
// // // Access      = Public
// // // Method      = GET 
// // // params      = category
// // // Body        = none

// // Router.get("/book/c/:category",(request,response)=>{
// //     const getCategory=Database.Book.filter((book)=>
// //         book.category.includes(request.params.category)
// //     );

// //     return response.json({book:getCategory});  
// // });

// // // Route         = /book/new
// // // Description  = to add new book
// // // Access       = Public
// // // Method       = POST
// // // params       = none 
// // // Body         = none
// // Router.post("/book/new", async(request,response)=>{
// //     try{
// //     const {newBook} = request.body;
// //     await Book.create(newBook);
// //     return response.json({message: "book added successfully"});
// //     }catch(error){
// //         return response.json({message: error.message});
// //     }
// // });

// // // Route         = /bookUpdate/:isbn
// // // Description  = to update or  change the book contents
// // // Access       = Public
// // // Method       = PUT
// // // params       = ISBN 
// // // Body         = none
// // Router.put("/bookUpdate/:isbn",(req,res)=>{
// //     const {updateBook} = req.body;
// //     const {isbn} = req.params;
   
// //     const book = Database.Book.map((book)=>{
// //         if (book.ISBN === isbn){
// //             return {...book, ...updateBook};
// //         };
// //         return(book);
// //     });
// //     return res.json(book);
// // });

// // Router.delete("/book/Delete/:isbn", (req, res)=>{
// //     const { isbn } = req.params;

// //     const filterBook = Database.Book.filter((book)=> book.ISBN !== isbn );

// //     Database.Book = filterBook;

// //     return res.json(Database.Book);
// // });

// module.exports = Router;
