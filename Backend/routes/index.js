const express = require('express');
const pool = require('../config.js')
const { isLoggedIn } = require('../middleware')
var jwt = require('jsonwebtoken');
const secret = 'riau'
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
  try {
    const [rows, fields] = await pool.query('SELECT * FROM post p JOIN tag t ON (p.tag_id = t.tag_id) JOIN member m ON (m.mem_id = p.mem_id)')
    return res.json(rows)

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

router.get("/admin/me", async function (req, res, next) {
  try {
    let authorization = req.headers.authorization

    if (!authorization) {
      return res.json({ role: "guess" })
    } else {
      let [part1, part2] = authorization.split(' ')
      if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
      }
      var decoded = jwt.verify(part2, secret);
    
      return res.json(decoded.user)
    }


  } catch (error) {
    console.log(error);
    next(error)
  }

});




exports.router = router;