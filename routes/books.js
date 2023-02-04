const express = require("express");

// Json data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/**
  * Route: /books
  * Method: GET 
  * Description: Get all books details
  * Access: Public
  * Parameter: none
  */
router.get("/",(req,res)=>{
    res.status(200).json({
        success :true,
        data: books,
    })
})

/**
  * Route: /books/:id
  * Method: GET
  * Description: Get books by id
  * Access: Public
  * Parameter: id
  */
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id === id);
    if(!book) return res.status(404).json({
        success: false,
        message: "No book is available with this id"
    })

    return res.status(200).json({
        success: true,
        data: book,
    })
})

/**
  * Route: /books/issuedbooks
  * Method: GET
  * Description: Get all issued books
  * Access: Public
  * Parameter: none
  */
router.get("/issued/books",(req,res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })
    if (issuedBooks.length === 0){
        return res.status(404).json({
            success:false,
            message: "No books issued yet",
        })
    }
    return res.status(300).json({
        success: true,
        data: issuedBooks,
    })

})

/**
  * Route: /books
  * Method: POST
  * Description: Create/Add new book
  * Access: Public
  * Parameter: none
  */
router.post("/",(req,res)=>{
    const {id, name, author, genre, price, publisher} = req.body;
    const book = books.find((each)=> each.id === id)
    if(book){
        return res.status(404).json({
            success: false,
            message: "Book with the given id already exist"
        })
    }
    books.push({
        id, 
        name, 
        author, 
        genre, 
        price, 
        publisher,
    })
    return res.status(200).json({
        success: true,
        data: books,
    })
})

/**
  * Route: /books/:id
  * Method: PUT
  * Description: Update books by id
  * Access: Public
  * Parameter: id
  */
router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const book = books.find((each)=>each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book with the given id not found",
        })
    }
    const updatedBooks = books.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updatedBooks,
    })
})



// default export
module.exports = router;