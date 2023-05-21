const express = require('express');
const pool = require('../config.js')
const { isLoggedIn } = require('../middleware/index.js')
const Joi = require('joi')
router = express.Router();

const commentOwner = async (req, res, next) => {

  if (req.user.role === 'admin') {
    return next()
  }
  const [[comment]] = await pool.query('SELECT * FROM comment WHERE comm_id = ?', [req.params.comId])

  console.log(comment.mem_id);
  console.log(req.user.mem_id);
  if (comment.mem_id !== req.user.mem_id) {
    return res.json({ message: 'You do not have permission to perform this action' })
  } else {
    next()
  }
}

const commentSchema = Joi.object({
  comm_content:Joi.string().required().min(20).messages({
    'string.base': `Comment should be a type of 'text'`,
    'string.empty': `Comment cannot be an empty field`,
    'string.min': `Comment should have a minimum length of {#limit}`,
    'any.required': `Comment is a required field`
  })
})

router.get("/comment/:postId", async function (req, res, next) {
    // Your code here
    // const {comm_content, post_id, mem_id} = req.body
    // console.log(comm_content, post_id, mem_id);
    try {
        const [rows, fields] = await pool.query('select * from comment c join member m on(m.mem_id = c.mem_id) where  c.post_id = ? order by accept desc , comm_created_at desc',
        [req.params.postId])
        return res.json(rows)
    } catch (error) {
        console.log(error);
    }
  });

 

router.post("/comment/create", isLoggedIn, async function (req, res, next) {
  // Your code here
  try {
    await commentSchema.validateAsync({comm_content:req.body.comm_content},  { abortEarly: false })
  } catch (err) {
    console.log(err);
    return res.json({status:"error",message:err.message})
  }
  const { comm_content, post_id, mem_id } = req.body
  console.log(comm_content, post_id, mem_id);
  try {
    const [rows, fields] = await pool.query('INSERT INTO comment(comm_content, post_id, mem_id) VALUES (?,?,?)',
      [comm_content, post_id, mem_id])
    const insertId = rows.insertId
    // console.log(insertId);
    const [rows1, fields1] = await pool.query("SELECT * FROM comment c join member m on (c.mem_id = m.mem_id) WHERE comm_id = ?",
      [insertId]);
      const [[{ cnt }]] = await pool.query('select count(*) as cnt from comment c join member m on(m.mem_id = c.mem_id) where  c.post_id = ? ',
      [post_id])

    return res.json({
      newComm:rows1[0],
      cnt:cnt,
      status:"success",
      message:"success"
    })
  } catch (error) {
    console.log(error);
  }
});

router.delete("/comment/delete/:comId", isLoggedIn, commentOwner, async function (req, res, next) {
  // Your code here
  try {
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
  const { comm_content } = req.body
  console.log(comm_content);
  try {
    const [rows, fields] = await pool.query("UPDATE comment SET comm_content=?  WHERE comm_id = ?",
      [comm_content, req.params.comId]);
    return res.json({
      "message": `Comment ID ${req.params.comId} is updated.`
    });

  } catch (err) {
    console.log(err)
    return next(err);
  }
});







exports.router = router;