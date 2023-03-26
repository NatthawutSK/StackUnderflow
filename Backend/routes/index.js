const express = require('express');
const pool = require('../config.js')


router = express.Router();

router.get("/tag", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM tag')
        return res.json(rows)
        
    } catch (error) {
        next(err)
    }
    
  });

  router.get("/", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM post p JOIN tag t ON (p.tag_id = t.tag_id) JOIN member m ON (m.mem_id = p.mem_id)')
        // const [rows, fields] = await pool.query('SELECT convert(varchar, CURRENT_TIMESTAMP,100) FROM post ;')
        // console.log(rows);
        return res.json(rows)
        
    } catch (error) {
        console.log(err);
        next(err)
    }
    
  });

exports.router = router;