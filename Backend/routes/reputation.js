const express = require('express');
const pool = require('../config.js')
const { isLoggedIn } = require('../middleware')
const { checkRepVoteUp, checkRepVoteDown, ownerQuestion} = require('../middleware/reputation.js')
router = express.Router();



router.put("/post/vote/up", isLoggedIn, checkRepVoteUp, async function (req, res, next) {
  const { voter_id, post_id, gotVote_id } = req.body
  try {
    const [rows, fields] = await pool.query('SELECT * FROM vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
    if (rows.length == 0) {
      const [rows1, fields1] = await pool.query('insert into vote_post(mem_id, post_id) values(?,?)', [voter_id, post_id])
      const [rows3, fields3] = await pool.query('select post_vote from post where post_id = ?', [post_id])
      let cnt = rows3[0].post_vote += 1
      const [rows2, fields2] = await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])

      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation + 10
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:rows3[0].post_vote })
    } else {
      return res.json({ status: "error" })
    }

  } catch (error) {
    console.log(error);
    next(error)
  }

});


router.put("/post/vote/down",isLoggedIn, checkRepVoteDown, async function (req, res, next) {
  const { voter_id, post_id, gotVote_id } = req.body

  try {
    const [rows, fields] = await pool.query('SELECT * FROM vote_post where mem_id = ? and post_id = ?', [voter_id, post_id])
    if (rows.length != 0) {
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
      return res.json({ status: "success", vote:rows3[0].post_vote })
    } else {
      return res.json({ status: "error" })
    }

  } catch (error) {
    console.log(error);
    next(error)
  }
})


router.put("/comm/vote/up", isLoggedIn, checkRepVoteUp, async function (req, res, next) {
  const { voter_id, comm_id, gotVote_id } = req.body
  console.log( voter_id, comm_id, gotVote_id);

  try {
    const [rows, fields] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
    if (rows.length == 0) {
      const [rows1, fields1] = await pool.query('insert into vote_comment(mem_id, comm_id) values(?,?)', [voter_id, comm_id])
      const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
      let cnt = rows3[0].comm_vote += 1
      const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation + 10
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:rows3[0].comm_vote })
    } else {
      return res.json({ status: "error" })
    }

  } catch (error) {
    console.log(error);
    next(error)
  }

})



router.put("/comm/vote/down", isLoggedIn, checkRepVoteDown, async function (req, res, next) {
  const { voter_id, comm_id, gotVote_id } = req.body
  try {

    const [rows, fields] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
    if (rows.length != 0) {
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
      return res.json({ status: "success", vote:rows3[0].comm_vote })
    } else {
      return res.json({ status: "error" })
    }

  } catch (error) {
    console.log(error);
    next(error)
  }

});






router.put("/answer/accept", isLoggedIn, ownerQuestion, async function (req, res, next) {
  const { answer_id,post_id,comm_id } = req.body
  // console.log(req.body);
  try {
    const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [answer_id])
    const rep = rows0[0].reputation + 15
    const [row,field] = await pool.query('SELECT * FROM comment where accept = ? and post_id = ?',[1,post_id])
    if(row.length > 0){
      return res.json({status:"failed",message:"You already accept Answer"})
    }
    else{
    const [row2,field2] = await pool.query('update comment set accept = ? where comm_id = ?',[1,comm_id])
    const [rows1, fields1] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, answer_id])
    return res.json({ status: "success", message: "You got Correctly Answer" })
    }

  } catch (error) {
    next(error)
  }

});






exports.router = router;