const express = require('express');
const pool = require('../config.js')
const Joi = require('joi')
const { isLoggedIn } = require('../middleware/index.js')
const blogOwner = async (req, res, next) => {
  if (req.user.role === 'admin') {
      return next()
  }
  const [[post]] = await pool.query('SELECT * FROM post WHERE post_id=?', [req.params.postId])

  if (post.mem_id !== req.user.mem_id) {
    return res.json({message:'You do not have permission to perform this action'})
  }
  next()
}

const tagValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT * FROM tag WHERE tag_id = ?", 
    [value]
  )
  if (rows.length == 0) {
      const message = 'This tag is not available'
      throw new Joi.ValidationError(message, { message })
  }
  return value
}

const memberValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT mem_user_name  FROM member WHERE mem_id = ?", 
    [value]
  )
  if (rows.length == 0) {
      const message = 'This member is not found'
      throw new Joi.ValidationError(message, { message })
  }
  return value
}


const forumSchema = Joi.object({
  post_desc: Joi.required(),
  post_title: Joi.string().required().min(20),
  tag_id: Joi.required().external(tagValidator),
  mem_id: Joi.required().external(memberValidator)
  
}) 


router = express.Router();
// router.use(isLoggedIn)
router.post("/post/create", isLoggedIn, async function (req, res, next) {
  try {
    await forumSchema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    console.log(err);
    return res.status(400).json(err)
  }

    // Your code here
    // console.log(req.body);
    const {post_title, post_desc, mem_id, tag_id} = req.body
    console.log(post_title, post_desc, mem_id, tag_id);
    try {
        const [rows, fields] = await pool.query('INSERT INTO post(post_title,post_desc,mem_id,tag_id) VALUES (?,?,?,?)',
        [post_title, post_desc, mem_id, tag_id])
        // console.log(rows);
        return res.json(rows)
    } catch (error) {
        next(error)
    }
  });

  router.delete("/post/delete/:postId",isLoggedIn,blogOwner, async function (req, res, next) {
    // Your code here
    try{
        const [rows, fields] = await pool.query("DELETE FROM post WHERE post_id = ?",
         [req.params.postId]);
        return res.json({
            "message": `Comment ID ${req.params.postId} is deleted.`
        });
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
  });

  router.put("/post/edit/:postId", async function (req, res, next) {
    // Your code here
    const {post_title, post_desc, tag_id} = req.body
    // console.log(post_title, post_desc, tag_id);
    try{
        const [rows, fields] = await pool.query("UPDATE post SET post_title=?,post_desc=?,tag_id=?  WHERE post_id = ?",
         [post_title,post_desc,tag_id,req.params.postId]);

         const [rows1, fields1] = await pool.query("SELECT * FROM post NATURAL JOIN member NATURAL JOIN tag where post_id = ?",
         [req.params.postId]);

         return res.json(rows1[0]);
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
  });



router.get("/post/:postId", async function (req, res, next) {
    // Your code here
    try{

         const [rows, fields] = await pool.query("SELECT * FROM post NATURAL JOIN member NATURAL JOIN tag where post_id = ?;",
         [req.params.postId]);

        return res.json(rows);
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
  });
  router.get('/postfollowing',isLoggedIn,async(req,res,next)=>{
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try{  
      const { page, pageSize } = req.query;
      const offset = (page - 1) * pageSize;
      const limit = parseInt(pageSize);
      sql = 'SELECT * FROM post JOIN follow USING(mem_id) JOIN member USING(mem_id) JOIN tag USING(tag_id) WHERE followby_id = ?'
      const [row,field] = await conn.query(sql,[req.user.mem_id])
      sql += ' LIMIT ? OFFSET ?'
      const [rows,fields] = await conn.query(sql,[req.user.mem_id,limit,offset])
      console.log(rows);
      res.json({post:rows, cnt:row.length})
      await conn.commit();
    }
    catch (err) {
      await conn.rollback();
      next(err)
    } finally {
      console.log("finally");
      conn.release();
    }
  })

  exports.router = router;