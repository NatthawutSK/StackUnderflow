const express = require('express');
const pool = require('../config.js')
const Joi = require('joi')
const { isLoggedIn } = require('../middleware')
const path = require("path");
router = express.Router();


// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 1048576 }  });


router.post("/profile/pic", isLoggedIn, upload.single("mem_pic"),  async function (req, res, next) {
  const file = req.file;
  const mem_id = req.body.mem_id
  // console.log(file.path.substr(6));
  try {
    const [rows, fields] = await pool.query('update member set mem_pic = ? where mem_id = ?', [file.path.substr(6), mem_id])
    const [rows1, fields1] = await pool.query('select mem_pic from member where mem_id = ?', [mem_id])
    
    return res.json(rows1[0])




  } catch (error) {
    console.log(error);
    next(error)
  }

});



router.get("/tag", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM tag ')
    return res.json(rows)

  } catch (error) {
    next(error)
  }

});


router.get("/", async function (req, res, next) {
  const { page, pageSize, tag } = req.query;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);
  let paramArr = [limit, offset]
  let paramCnt= []
  let queri = "SELECT * FROM post p JOIN tag t ON (p.tag_id = t.tag_id) JOIN member m ON (m.mem_id = p.mem_id)";
  let queriCnt = "SELECT count(*) as cnt FROM post p join tag t on(p.tag_id = t.tag_id)"
  if(tag != "All"){
    queri += " where t.tag_name = ?"
    queriCnt += " where t.tag_name = ?"
    paramArr.unshift(tag)
    paramCnt.push(tag)
  
  }

  queri += " LIMIT ? OFFSET ?"
  try {
    const [[{ cnt }]] = await pool.query(queriCnt, paramCnt)
    const [rows, fields] = await pool.query(queri, paramArr)
    return res.json({
      cnt: cnt,
      post: rows
    })

  } catch (error) {
    console.log(error);
    next(error)
  }

});

router.get("/user/me", isLoggedIn, async function (req, res, next) {
  try {
    res.json(req.user)
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.get('/following/',isLoggedIn,async(req,res,next)=>{
  try{
    const [row,field] = await pool.query(`SELECT m.mem_user_name,m.mem_email,m.mem_id FROM follow 
    JOIN member m USING(mem_id) join member f
    on (f.mem_id = followby_id)
     where followby_id=?`,[req.user.mem_id])
     res.json({following:row})
  }catch(error){
    next(error)
  }
})

router.post('/follow',async function(req,res,next) {
    const conn = await pool.getConnection();
    const {mem_id,followby_id} = req.body
    await conn.beginTransaction();
    try{
      const [row,field] = await conn.query('SELECT * FROM follow WHERE mem_id=? and followby_id=?',[mem_id,followby_id])
      console.log(row.length);
      if(row.length === 0){
      const [rows,fields] = await conn.query('INSERT INTO follow(mem_id,followby_id) VALUES(?,?)',[mem_id,followby_id])
      }
      else{
        console.log('sad');
        const [row,field2] = await conn.query('DELETE FROM follow WHERE mem_id=? and followby_id=?',[mem_id,followby_id])
      }
      const [rows2,fields2] = await conn.query(`SELECT f.mem_user_name,f.mem_email,f.mem_id FROM follow 
      JOIN member m USING(mem_id) join member f
      on (f.mem_id = followby_id)
       where m.mem_id=?`,[mem_id])
       console.log(rows2);
         res.json({follow:rows2})
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
router.get('/getprofile/:id',isLoggedIn,async(req,res,next)=>{
  const id = req.params.id
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try{
    const [row,fieldd] = await conn.query(`SELECT mem_user_name,mem_email,role,mem_id,mem_fname,mem_lname FROM member where mem_id=?`,[id])
    const [rows,field] = await conn.query(`SELECT f.mem_user_name,f.mem_email,f.mem_id
    FROM follow
    JOIN member m
    USING(mem_id) 
    join member f
    on (f.mem_id = followby_id)
    where m.mem_id = ?;`,[id])
    const [rows2,field2] = await conn.query(`SELECT mem_user_name,mem_email,mem_id  FROM member JOIN follow USING(mem_id) where followby_id = ?`,[id]);
    const [rows3,field3] = await conn.query(`SELECT count(*) 'question'  FROM post JOIN member USING(mem_id) where mem_id = ?`, [id])
    console.log(rows,rows2);
    const [rows4,field4] = await conn.query(`SELECT count(*) 'answer' FROM comment JOIN member USING(mem_id) where mem_id = ? and accept = 1`, [id])
    res.json({user:row[0],follower:rows,followby:rows2,question:rows3[0].question,answer:rows4[0].answer})
  }catch (err) {
    await conn.rollback();
    next(err)
  } finally {
    console.log("finally");
    conn.release();
  }
})

const passwordValidator = (value, helpers) => {
  if (value.length < 8) {
      throw new Joi.ValidationError('Password must contain at least 8 characters')
  }
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
      throw new Joi.ValidationError('Password must be harder')
  }
  return value
}
const userSchema = Joi.object({
  fname: Joi.string().required().max(15).min(5),
  lname:Joi.string().required().max(15).min(5),
  email: Joi.string().required().email(), 
  username: Joi.string().required().min(5).max(15)
}) 
const passwordSchema = Joi.object({
  password: Joi.string().required().custom(passwordValidator).min(8),
  cpassword: Joi.string().required().valid(Joi.ref('password')),
})

router.put('/updateuser',isLoggedIn,async(req,res,next)=>{
  try {
    await userSchema.validateAsync(req.body,  { abortEarly: false })
  } catch (err) {
    return res.json({status:"error",error:err.message})
  }
    const {fname,email,username} = req.body
  console.log(req.body);
    const [row,field] = await pool.query('SELECT mem_id,mem_user_name,mem_email from member where mem_email = ? or mem_user_name = ?',[email,username])
    if(row.length>0){
        res.json({status:"error",message:"username or email already taken"})
    }
    else{
      const [rows,fields] = await pool.query('UPDATE member SET mem_fname = ?, mem_email = ?, mem_user_name = ? where mem_id = ?',[fname,email,username,req.user.mem_id])
      res.json({status:"success",message:"Update profile success"})
    }
})

exports.router = router;