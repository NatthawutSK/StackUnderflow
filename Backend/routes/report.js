const express = require('express');
const pool = require('../config.js')
const Joi = require('joi')
const {isLoggedIn} = require('../middleware')
router = express.Router()

const isAdmin = async(req,res) =>{
    if(req.user.role == 'admin'){
        next()
    }else{
        res.json({status:'error', message:'you dont have permission'})
    }
}

router.post("/report",async(req,res)=>{
    const {content, postId} = req.body
    try{
       const [rows,field] = await pool.query('INSERT INTO report(report_content,post_id) VALUES(?,?)',[content,postId])
       return res.json({status:"success"})
    }catch(err){
        console.log(err);
    }
})
router.post("/ban",isLoggedIn,isAdmin,async(req,res)=>{
    const {id} = req.body
    try{
    const [rows,field] = await pool.query("DELETE FROM member WHERE mem_id=?",[id])
    res.json({status:"success"})
    }
    catch(err){
        console.log(err);
    }
})
exports.router = router;