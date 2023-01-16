
const express = require("express");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Server is running succesfully",
    })
})

app.get("*",(req,res)=>{
    res.status(404).json({
        message: "Page not found"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)
})