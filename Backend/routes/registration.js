const express = require('express');
const pool = require('../config.js')
const Joi = require('joi')


const jwt = require('jsonwebtoken');
const secret = 'riau'
const saltRounds = 10;
const bcrypt = require('bcrypt');
router = express.Router();


const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().required().email(), 
    fname: Joi.string().required().max(15).min(5),
    lname: Joi.string().required().max(15).min(5),
    password: Joi.string().required().custom(passwordValidator).min(8),
    cpassword: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).max(15)
  }) 

router.post("/register", async function  (req, res, next) {
    try {
        await signupSchema.validateAsync(req.body,  { abortEarly: false })
      } catch (err) {
        return res.status(400).json(err)
      }

    const {fname,lname,email,username,password} = req.body
    bcrypt.hash(password, saltRounds, async function(err, hash){
        try {
            const [rows1, fields] = await pool.query('select * from member where mem_email = ? or mem_user_name = ?',
            [email, username])
            console.log(rows1);
            if(rows1.length == 0){
                const [rows, fields] = await pool.query('INSERT INTO member(mem_fname,mem_lname,mem_email,mem_user_name,mem_password) VALUES(?,?,?,?,?)',
                [fname,lname,email,username,hash])
                return res.json({status:"success", message:"successfully register"})

            }
            else{
                return res.json({status: "error", message:"Username or email has already taken"})
            }
        } catch (err) {
            console.log(err);
            next(err)
            
        }
    })
});

router.post('/login', async (req,res,next) =>{
    const {username,password} = req.body
    try {
        const [rows, fields] = await pool.query('SELECT * FROM member WHERE mem_user_name = ?',
        [username])
        if(rows.length == 0){
            return res.json({status: "error", message: "User not found"})
            
        }else {
            bcrypt.compare(password,rows[0].mem_password, async function(err,isLogin){
                if(isLogin){
                    const [rows1, fields1] = await pool.query('SELECT mem_id, mem_fname,mem_email,mem_user_name,role,mem_pic FROM member WHERE mem_user_name = ?',
                    [username])
                    var token = jwt.sign({ user: rows1[0] }, secret);
                    res.json({status:'success',token:token, message:"Successfully Login"})
                }
                else{
                    res.json({status: 'error', message:"Username and Password doesn't match"})
                }
            })
        }  
    } catch (error) {
        next(error)
    }

    
})



// router.post('/authen', (req,res) =>{
//     try{
//         const token = req.headers.authorization.split(' ')[1]
//         console.log(token);
//         var decoded = jwt.verify(token,secret);
//         res.json({decoded,status:'ok'})
//     }
//     catch(err){
//         res.json({error:err})
//     }
// });

exports.router = router;