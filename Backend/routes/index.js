const express = require('express');
const pool = require('../config.js')
const { isLoggedIn } = require('../middleware')
router = express.Router();

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





exports.router = router;