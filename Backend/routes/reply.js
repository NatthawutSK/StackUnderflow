const express = require('express');
const pool = require('../config.js')
// const {isLoggedIn} = require('../middleware');
router = express.Router()


router.get("/reply", async function (req, res, next) {
    const {post_id} = req.query
      try {
          const [rows, fields] = await pool.query('select * from reply_comment where post_id = ?',
          [post_id])
          return res.json(rows)
      } catch (error) {
          next(error)
      }
    });


router.post("/create/reply", async function (req, res, next) {
    

      const {comm_id, post_id, reply_content} = req.body
      console.log(comm_id, post_id, reply_content);
      try {
          const [rows, fields] = await pool.query('INSERT INTO reply_comment(comm_id, post_id, reply_content) VALUES (?,?,?)',
          [comm_id, post_id, reply_content])
          console.log(rows.insertId);
          return res.json(rows)
      } catch (error) {
          next(error)
      }


    });















exports.router = router;