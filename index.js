
const express = require("express");

// Json data import
const {users} = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Server is running succesfully",
    })
});

 /**
  * Route: /users
  * Method: GET 
  * Description: Get all user acoount
  * Access: Public
  * Parameter: none
  */
app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data: users,
    });
});

 /**
  * Route: /users/:id
  * Method: GET
  * Description: Get single user by id
  * Access: Public
  * Parameter: id
  */
app.get("/users/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
})
/**
  * Route: /users
  * Method: POST
  * Description: Create/Add new user
  * Access: Public
  * Parameter: none
  */
 app.post("/users",(req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find( (each)=>each.id === id );
    if(user){
        return res.status(404).json({
            success: false,
            message: "User with this id already exist",
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    })
    res.status(201).json({
        success: true,
        data: users,
    })
 });


app.get("*",(req,res)=>{
    res.status(404).json({
        message: "Page not found"
    })
});

app.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)
});