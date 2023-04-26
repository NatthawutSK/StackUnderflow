const express = require('express');
const pool = require('../config.js')
const { isLoggedIn } = require('../middleware/index.js')

router = express.Router();
// router.use(isLoggedIn)

const commentOwner = async (req, res, next) => {

  if (req.user.role === 'admin') {
      return next()
  }
  const [[comment]] = await pool.query('SELECT * FROM comment WHERE comm_id = ?', [req.params.comId])

  console.log(comment.mem_id);
  console.log(req.user.mem_id);
  if (comment.mem_id !== req.user.mem_id) {
    // console.log("555");
    return res.json({message:'You do not have permission to perform this action'})
  }else{
    next()
  }

  
}

router.get("/comment/:postId", async function (req, res, next) {
    // Your code here
    // const {comm_content, post_id, mem_id} = req.body
    // console.log(comm_content, post_id, mem_id);
    try {
        const [rows, fields] = await pool.query('select * from comment c join member m on(m.mem_id = c.mem_id) where  c.post_id = ?',
        [req.params.postId])
        return res.json(rows)
    } catch (error) {
        console.log(error);
    }
  });

router.post("/comment/create",isLoggedIn,  async function (req, res, next) {
    // Your code here
    const {comm_content, post_id, mem_id} = req.body
    console.log(comm_content, post_id, mem_id);
    try {
        const [rows, fields] = await pool.query('INSERT INTO comment(comm_content, post_id, mem_id) VALUES (?,?,?)',
        [comm_content, post_id, mem_id])
      const insertId = rows.insertId
      // console.log(insertId);
        const [rows1, fields1] = await pool.query("SELECT * FROM comment WHERE comm_id = ?",
         [insertId]);

        return res.json(rows1)
    } catch (error) {
        console.log(error);
    }
  });

  router.delete("/comment/delete/:comId",isLoggedIn, commentOwner, async function (req, res, next) {
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
 
  router.put("/comment/edit/:comId", isLoggedIn, commentOwner, async function (req, res, next) {
    // Your code here
    const {comm_content} = req.body
    console.log(comm_content);
    try{
        const [rows, fields] = await pool.query("UPDATE comment SET comm_content=?  WHERE comm_id = ?",
         [comm_content,req.params.comId]);
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