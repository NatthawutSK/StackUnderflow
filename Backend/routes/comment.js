const express = require('express');
const pool = require('../config.js')


router = express.Router();

router.post("/comment/create", async function (req, res, next) {
    // Your code here
    const {comm_content, post_id, mem_id} = req.body
    // console.log(comm_content, post_id, mem_id);
    try {
        const [rows, fields] = await pool.query('INSERT INTO comment(comm_content, post_id, mem_id) VALUES (?,?,?)',
        [comm_content, post_id, mem_id])
        return res.json(rows)
    } catch (error) {
        console.log(error);
    }
  });

  router.delete("/comment/delete/:comId", async function (req, res, next) {
    // Your code here
    try{
        const [rows, fields] = await pool.query("DELETE FROM comment WHERE comm_id = ?",
         [req.params.comId]);
        return res.json({
            "message": `Comment ID ${req.params.comId} is deleted.`
        });
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
  });

  router.put("/comment/edit/:comId", async function (req, res, next) {
    // Your code here
    const {comm_content, post_id, mem_id} = req.body
    try{
        const [rows, fields] = await pool.query("UPDATE comment SET comm_content=?,post_id=?,mem_id=?  WHERE comm_id = ?",
         [comm_content, post_id, mem_id,req.params.comId]);
        return res.json({
            "message": `Comment ID ${req.params.comId} is updated.`
        });
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
  });


  router.put('/comment/addlike/:comId', async function(req, res, next){
    try{
        const [rows, fields] = await pool.query("UPDATE comment SET comm_like = (SELECT comm_like FROM comment WHERE comm_id = ?)+1 WHERE comm_id = ?",
         [req.params.comId, req.params.comId]);

         const [rows1, fields1] = await pool.query("SELECT * FROM comment WHERE comm_id = ?",
         [req.params.comId]);

         const [{comm_id, comm_like}] = rows1;
        //  console.log(blog_id, like);
        return res.json({
            commId : comm_id,
            likeNum : comm_like
        });
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
});



  exports.router = router;