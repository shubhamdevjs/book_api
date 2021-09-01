const { request, response, urlencoded } = require("express");
const express= require("express");
const { Book } = require("./database");
const ourApp= express();

ourApp.use(express.json());

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

// POST
// Route         = /book/new
// Description  = to add new book
// Access       = Public
// Method       = POST
// params       = none 
// Body         = none
ourApp.post("/book/new",(request,response)=>{
    const {newBook} = request.body;
    //Pushing the changes to the variable
    Database.Book.push(newBook);

    return response.json(Database.Book);
}) ;

// Route         = /author/new
// Description  = to add new author
// Access       = Public
// Method       = POST
// params       = none 
// Body         = none
ourApp.post("/author/new",(req,res)=>{
    const {author}=req.body;
    console.log(author);
//psuhing the changes to the variable
    Database.author.push(author);

    return res.json(Database.author);
});

// Route         = /publication/new
// Description  = to add new publiction
// Access       = Public
// Method       = POST
// params       = none 
// Body         = none

ourApp.post("/publication/new", (req, res)=>{
    const {publication} = req.body;
    
    console.log(publication);
    //Pushing the changes to the variable
    Database.publication.push(publication);
    return res.json(Database.publication);
    // return res.json({ message:"publication was added successfully" });
});

//PUT

// Route         = /bookUpdate/:isbn
// Description  = to update or  change the book contents
// Access       = Public
// Method       = PUT
// params       = ISBN 
// Body         = none
ourApp.put("/bookUpdate/:isbn",(req,res)=>{
    const {updateBook} = req.body;
    const {isbn} = req.params;
   
    const book = Database.Book.map((book)=>{
        if (book.ISBN === isbn){
            return {...book, ...updateBook};
        };
        return(book);
    });
    return res.json(book);
});

// Route         = /book/authorUpdate/:isbn
// Description  = to update or  change author of the  book
// Access       = Public
// Method       = PUT
// params       = ISBN 
// Body         = none
ourApp.put("/book/authorUpdate/:isbn", (req, res)=>{
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    const book = Database.Book.map((book)=>{
        if (book.ISBN === isbn){
            if(!book.authors.includes(newAuthor)){
                return book.authors.push(newAuthor);
            };
            return book;
        };
        return book;
    });
    const auThor = Database.author.map((author)=>{
        if( auThor.id === newAuthor){
            if(!author.books.includes(isbn)){
                return author.book.push(isbn);
            };
            return author;
        }
        return author
    });
    
});
// Updating the title of the book
ourApp.put("/bookUpdateTitle/:isbn",(req,res)=>{
    const {updateBook} = req.body;
    const {isbn} = req.params;

    Database.Book.forEach((book)=>{
        if(book.ISBN === isbn){
            book.title = updateBook;
        }
        return book;
    });
    return res.json(Database.Book);
});

// adding author id in book and adding isbn to the authors part

ourApp.put("/book/updateAuthorId/:isbn", (req, res)=>{
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    Database.Book.forEach((book)=>{
        if (book.ISBN === isbn){
            if(!book.authors.includes(newAuthor)){
                book.authors.push(newAuthor);
                return book;
            };
            return book;
        }
        return book;
    });
    // return res.json(Database.Book);

    // Updating book isbn no in author part in database
    Database.author.forEach((authors)=>{
        if(authors.id === newAuthor){
            if(!authors.books.includes(isbn)){
                authors.books.push(isbn);
                return authors;
            }
            return authors;
        }
        return authors;
        
    })
    return res.json({ book: Database.Book, authors:Database.author });
});

// DELETE Book 

ourApp.delete("/book/Delete/:isbn", (req, res)=>{
    const { isbn } = req.params;

    const filterBook = Database.Book.filter((book)=> book.ISBN !== isbn );

    Database.Book = filterBook;

    return res.json(Database.Book);
});

// DELETE author 

ourApp.delete("/author/delete/:isbn/:id", (req, res)=>{
    const { isbn, id} = req.params;

    Database.Book.forEach((book)=>{
        if( book.ISBN === isbn){
            if(!book.authors.includes(parseInt(id))){
                return book;
            }
            book.authors = book.authors.filter((identify) => identify !== parseInt(id));

            return book;
        }
        return book;
    });

// to delete the book isbn from athour books also

     Database.author.forEach((auth) => {
         if (auth.id === parseInt(id)){
             if(!auth.books.includes(isbn)){
                 return auth;
             }
             auth.books = auth.books.filter((book)=> book !== isbn);

             return auth;
         }
         return auth;
     })
     return res.json({ Books: Database.Book, Author: Database.author})

})

// Route         = /author/delete/:id
// Description  = delete an author completely
// Access       = Public
// Method       = DELETE
// params       = ID 
// Body         = none

ourApp.delete("/author/delete/:id", (req, res)=>{
    const { id } = req.params;

    const fileteredAuthor = Database.author.filter((auth) => auth.id !== parseInt(id));

    Database.author = fileteredAuthor;

    return res.json(Database.author);
})

// Route         = /publication/delete/:id
// Description  = delete an publication completely
// Access       = Public
// Method       = DELETE
// params       = ID
// Body         = none

ourApp.delete("/publication/delete/:id", (req, res)=> {
    const { id } = req.params;

    const filteredPub = Database.publication.filter((pub)=> pub.id !== parseInt(id));

    Database.publication = filteredPub;

    return res.json(Database.publication);
})

// Route         = /publication/book/delete/:isbn/:id
// Description  = delete an publication from a book
// Access       = Public
// Method       = DELETE
// params       = ISBN, ID
// Body         = none

ourApp.delete("/publication/book/delete/:isbn/:id", (req, res) => {
    const { isbn, id } = req.params;

    Database.Book.forEach((bukki) => {
        if(bukki.ISBN == isbn){
            bukki.publication = 0;
            return bukki;
        }
        return bukki;
    });
    Database.publication.forEach((pub)=> {
        if ( pub.id === parseInt(id)){
            const filteredpubwithbook = Database.publication.filter((pubsub)=> pubsub !== isbn);  
            
            Database.publication = filteredpubwithbook;

            return pub;
        }
        return pub;

    });
     
    return res.json({Books: Database.Book, publications: Database.publication});
});


ourApp.listen(4000, ()=>console.log("server is running")); 