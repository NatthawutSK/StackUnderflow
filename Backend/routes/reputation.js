const express = require('express');
const pool = require('../config.js')
const { checkRepVoteUp, checkRepVoteDown } = require('../middleware/reputation.js')
router = express.Router();


// ใช้ได้ทั้ง question และ answer
router.put("/rep/vote/up",checkRepVoteUp, async function (req, res, next) {
  const { voter_id, post_id, comm_id, gotVote_id } = req.body
  try {

    if (comm_id == undefined && post_id != undefined) {
      const [rows, fields] = await pool.query('SELECT * FROM vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
      if (rows.length == 0) {
        const [rows1, fields1] = await pool.query('insert into vote_post(mem_id, post_id) values(?,?)', [voter_id, post_id])
        const [rows3, fields3] = await pool.query('select post_vote from post where post_id = ?', [post_id])
        // res.json(rows3[0].post_vote)
        let cnt = rows3[0].post_vote += 1
        const [rows2, fields2] = await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])

        const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
        const rep = rows0[0].reputation + 10
        const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
        return res.json({ status: "success vote up" })
      } else {
        // const [rows1, fields1] = await pool.query('delete from vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
        return res.json({ message: "kod vote post pai law" })
      }
    } else if(comm_id != undefined && post_id == undefined){
        const [rows, fields] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
        if (rows.length == 0) {
          const [rows1, fields1] = await pool.query('insert into vote_comment(mem_id, comm_id) values(?,?)', [voter_id, comm_id])
          const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
          // res.json(rows3[0].post_vote)
          let cnt = rows3[0].comm_vote += 1
          const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])


          const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
          const rep = rows0[0].reputation + 10
          const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
          return res.json({ status: "success vote comment vote up" })
        } else {
          // const [rows1, fields1] = await pool.query('delete from vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
          return res.json({ message: "kod vote comment pai law" })
        }

    }else{
      return res.json({message: "something went wrong in vote up"})
    }
      

  } catch (error) {
    next(error)
  }

});

// ใช้ได้ทั้ง question และ answer
router.put("/rep/vote/down", checkRepVoteDown, async function (req, res, next) {
  const { voter_id, post_id, comm_id, gotVote_id } = req.body
  try {
    // res.json({voter_id, post_id, comm_id, gotVote_id})
    if (comm_id != undefined && post_id == undefined) {
      // res.json({voter_id, post_id, comm_id, gotVote_id})
      const [rows, fields] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
      if (rows.length != 0) {
        // res.json(rows)
        const [rows1, fields1] = await pool.query('delete from vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
        const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
        let cnt = rows3[0].comm_vote -= 1
        await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])


        const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
        const rep_voter = rows0[0].reputation - 1
        const [rows4, fields4] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
        const rep_gotVote = rows4[0].reputation - 2
        await pool.query('update member set reputation = ? where mem_id = ?', [rep_voter, voter_id])
        await pool.query('update member set reputation = ? where mem_id = ?', [rep_gotVote, gotVote_id])
        return res.json({ status: "success vote down" })
      } else {
        return res.json({ message: "yang mai vote" })
      }
    }
    else if(comm_id == undefined && post_id != undefined){
      const [rows, fields] = await pool.query('SELECT * FROM vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
      if (rows.length != 0) {
        // res.json(rows)
        const [rows1, fields1] = await pool.query('delete from vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
        const [rows3, fields3] = await pool.query('select post_vote from post where post_id = ?', [post_id])
        let cnt = rows3[0].post_vote -= 1
        await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])


        const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
        const rep_voter = rows0[0].reputation - 1
        const [rows4, fields4] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
        const rep_gotVote = rows4[0].reputation - 2
        await pool.query('update member set reputation = ? where mem_id = ?', [rep_voter, voter_id])
        await pool.query('update member set reputation = ? where mem_id = ?', [rep_gotVote, gotVote_id])
        return res.json({ status: "success vote down" })
      } else {
        return res.json({ message: "yang mai vote" })
      }

  }else{
    return res.json({message: "something went wrong in vote down"})
  }
    

  } catch (error) {
    next(error)
  }

});

router.put("/rep/answer/accept", async function (req, res, next) {
  const { answer_id } = req.body
  try {
    const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [answer_id])
    const rep = rows0[0].reputation + 15
    const [rows1, fields1] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, answer_id])
    return res.json({ status: "success" })

  } catch (error) {
    next(error)
  }

});






exports.router = router;