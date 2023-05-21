const express = require('express');
const pool = require('../config.js')
const {isLoggedIn} = require('../middleware');
router = express.Router()


router.get("/reply", async function (req, res, next) {
    const {post_id,comm_id} = req.query
      try {
          const [rows, fields] = await pool.query('select rc.reply_content, m.mem_user_name, rc.reply_create_at, rc.comm_id, rc.mem_id, m.mem_pic from reply_comment rc join member m on (rc.mem_id = m.mem_id) where post_id = ? and comm_id = ?',
          [post_id,comm_id])
          return res.json(rows)
      } catch (error) {
          next(error)
      }
    });



async function checkBeforeReply(req, res, next){
    const {comm_id, post_id, reply_content, mem_id} = req.body

    try {
        // console.log("kuy");
        const [reput] = await pool.query('select reputation from member where mem_id = ?', [mem_id])
        const [ownerPost] = await pool.query('select mem_id from post where post_id = ?', [post_id])
        const [ownerCom] = await pool.query('select mem_id from comment where comm_id = ?', [comm_id])
       
        if((ownerPost[0].mem_id !== req.user.mem_id && ownerCom[0].mem_id !== req.user.mem_id)){
            return res.json({message:'You Must Be Owner Post or Comment', status:"error"})
        } else if(reput[0].reputation < 50 && ownerPost[0].mem_id !== req.user.mem_id && ownerCom[0].mem_id !== req.user.mem_id){
            return res.json({message:'You Must Have More Than 50 Reputation', status:"error"})
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
    next()



}


router.post("/create/reply", isLoggedIn, checkBeforeReply, async function (req, res, next) {
    
      const {comm_id, post_id, reply_content, mem_id} = req.body
      const conn = await pool.getConnection();
      await conn.beginTransaction();
      console.log(comm_id, post_id, reply_content);
      try {
          const [rows, fields] = await conn.query('INSERT INTO reply_comment(comm_id, post_id, reply_content, mem_id) VALUES (?,?,?,?)',
          [comm_id, post_id, reply_content, mem_id])
          const [data] = await conn.query('select rc.reply_content, m.mem_user_name, rc.reply_create_at, rc.comm_id, rc.mem_id, m.mem_pic from reply_comment rc join member m on (rc.mem_id = m.mem_id) where reply_id = ?',
          [rows.insertId])
        //   console.log(rows.insertId);
          res.json(data[0])
          conn.commit()
      } catch (err) {
        await conn.rollback();
        next(err)
      } finally {
        console.log("finally");
        conn.release();
      }


    });















exports.router = router;