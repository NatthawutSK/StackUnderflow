const express = require('express');
const pool = require('../config.js')
const Joi = require('joi')
const {isLoggedIn} = require('../middleware');
router = express.Router()

const isAdmin = async(req,res,next) =>{
    if(req.user.role == 'admin'){
        next()
    }else{
        res.json({status:'error', message:'you dont have permission'})
    }
}

router.get("/report", async(req,res,next)=>{
    try{
        const [rows,field] = await pool.query(`SELECT * FROM report JOIN post USING(post_id) WHERE status IN ('Pending','Guilty')`)
        return res.json(rows)
    }
    catch(e){
        next(e)
    }
})
router.post("/report",async(req,res)=>{
    const {content, postId} = req.body
    try{
       const [rows,field] = await pool.query('INSERT INTO report(report_content,post_id) VALUES(?,?)',[content,postId])
       return res.json({status:"success"})
    }catch(err){
        console.log(err);
    }
})
router.put("/report",isLoggedIn,isAdmin,async(req,res)=>{
    const {status,reportId} = req.body
    console.log(req.body);
    try{
        const [rows,field] = await pool.query('UPDATE report SET status = ? WHERE report_id = ?',[status,reportId])
        res.json({delete:rows.affectedRows})
    }
    catch(err){
        next(err)
    }
})
router.get('/reportuser',async(req,res)=>{
    try{
        const [rows,field] = await pool.query(`SELECT mem_id,mem_user_name,mem_email,COUNT(report_id) 'Post_Reported' FROM member JOIN post USING(mem_id) JOIN report USING(post_id) WHERE role != 'admin' GROUP BY mem_id order by 'Post_Reported'`)
        console.log(rows);
        res.json(rows)
    }catch(e){
        console.log(e);
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