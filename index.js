const express = require('express');
const { body ,validationResult } = require('express-validator');
const app = express();


app.use(express.json());
app.post('./user',(req , res)=>{
    User.create({
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        email : req.body.email,
        pincode : req.body.pincode,
        age : req.body.age,
        gender : req.body.gender,
    }).then(user => {
        res.json(user);
    })
})
app.post(
    '/user',
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('pincode').isLength((8)),
    body('age').isLength({min : 1, max : 100}),
    body('gender').if(body('gender').equals('male')||body('gender').equals('female')||body('gender').equals('others')).notEmpty()
)

app.get('/users',(req,res)=>{
    res.send("express-validator")
})
app.listen(3000,(req,res)=>{
    console.log("working");
});
