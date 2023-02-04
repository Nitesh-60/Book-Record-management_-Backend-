
const express = require("express");
const dotenv = require("dotenv");

// Database connection
const DbConnection = require("./databaseConnection")

// Importing users routes
const usersRouter = require("./routes/users");
// Importing books routes
const booksRouter = require("./routes/books");

// DB details
dotenv.config();

// initialization of express
const app = express();

DbConnection();

// PORT variable
const PORT = 8081;


app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Server is running succesfully",
    })
});

app.use("/users",usersRouter);
app.use("/books", booksRouter)

 
app.get("*",(req,res)=>{
    res.status(404).json({
        message: "Page not found"
    })
});

app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)
});