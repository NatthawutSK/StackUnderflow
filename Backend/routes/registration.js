const express = require('express');
const pool = require('../config.js')

var jwt = require('jsonwebtoken');
const secret = 'riau'
const bcrypt = require('bcrypt');
const saltRounds = 10;
router = express.Router();


router.post("/register", async function  (req, res, next) {
    const {fname,lname,email,username,password} = req.body
    bcrypt.hash(password, saltRounds, async function(err, hash){
        try {
            const [rows1, fields] = await pool.query('select mem_email from member where mem_email = ?',
            [email])
            console.log(rows1.length);
            if(rows1.length == 0){
                const [rows, fields] = await pool.query('INSERT INTO member(mem_fname,mem_lname,mem_email,mem_user_name,mem_password) VALUES(?,?,?,?,?)',
                [fname,lname,email,username,hash])
                return res.json(rows)
            }
            else{
                return res.json({status: "email use pai laew"})
            }
        } catch (err) {
            console.log(err);
            next(err)
            
        }
    })
});

router.post('/login', async (req,res) =>{
    const {username,password} = req.body
    try {
        const [rows, fields] = await pool.query('SELECT * FROM member WHERE mem_user_name = ?',
        [username])
        if(rows.length == 0){
            return res.json({status: "error", message: "user not found"})
            
        }else {
            bcrypt.compare(password,rows[0].mem_password, function(err,isLogin){
                if(isLogin){
                    var token = jwt.sign({ user: rows[0] }, secret,{ expiresIn: '1h' });
                    res.json({status:'ok',token:token})
                }
                else{
                    res.json({status: 'Invalid Password', err: err})
                }
            })
        }  
    } catch (error) {
        next(err)
    }

    
})



router.post('/authen', (req,res) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token);
        var decoded = jwt.verify(token,secret);
        res.json({decoded,status:'ok'})
    }
    catch(err){
        res.json({error:err})
    }
});

exports.router = router;