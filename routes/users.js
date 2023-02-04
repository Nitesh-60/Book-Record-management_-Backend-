const express = require("express");

// Json data import
const{users} = require("../data/users.json");

const router = express.Router();

/**
  * Route: /users
  * Method: GET 
  * Description: Get all user acoount
  * Access: Public
  * Parameter: none
  */
router.get("/",(req,res)=>{
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
router.get("/:id",(req,res)=>{
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
router.post("/",(req,res)=>{
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

/**
  * Route: /users/:id
  * Method: PUT
  * Description: Update user by id
  * Access: Public
  * Parameter: id
  */
router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=>each.id===id);
    if(!user) return res.status(404).json({success:false,message: "User not found"})

    const UpdataedUser = users.map((each)=>{
        if(each.id ===id){
            // This logic is not the right logic
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        succcess:true,
        data: UpdataedUser,
    })
})

/**
  * Route: /users/:id
  * Method: Delete
  * Description: Delete user by id
  * Access: Public
  * Parameter: id
  */
router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User nod found to delete",
        })
    }
    const index = users.indexOf(user);
    users.splice(index,1);
    return res.status(200).json({
        success: true,
        data: users,
    });
})

/**
  * Route: /users/subscription-details/{id}
  * Method: GET
  * Description: Get subscription details using id
  * Access: Public
  * Parameter: id
  */
router.get("/subscription-details/:id",(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id === id)
    if(!user) return res.status(200).json({
        success: false,
        message: "User not found",
    });

});


module.exports = router;