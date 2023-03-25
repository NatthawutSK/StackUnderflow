const express = require('express');
const pool = require('../config.js')


router = express.Router();

router.get("/", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM post')
        return res.json(rows)
        
    } catch (error) {
        next(err)
    }
    
  });

exports.router = router;