const express = require('express');
const pool = require('../config.js')
const { isLoggedIn } = require('../middleware')
const { checkRepVoteUp, checkRepVoteDown, ownerQuestion} = require('../middleware/reputation.js')
router = express.Router();



router.put("/post/vote/up", isLoggedIn, checkRepVoteUp, async function (req, res, next) {
  const { voter_id, post_id, gotVote_id } = req.body
  try {
    
    const [check] = await pool.query('SELECT * FROM vote_post where mem_id = ? and post_id = ? ', [voter_id, post_id])
    if (check.length == 0) {
      const [rows1, fields1] = await pool.query('insert into vote_post(mem_id, post_id, vote_status) values(?,?,?)', [voter_id, post_id, "up"])
    } else if(check[0].vote_status == "mid"){
      const [rows1, fields1] = await pool.query('update vote_post set vote_status = ? where vote_post_id = ?', ["up", check[0].vote_post_id])

    } else if(check[0].vote_status == "down"){
      const [rows3, fields3] = await pool.query('select post_vote from post where post_id = ?', [post_id])
      let cnt = rows3[0].post_vote += 1
      const [rows2, fields2] = await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])

      const [rows1, fields1] = await pool.query('update vote_post set vote_status = ? where vote_post_id = ?', ["mid", check[0].vote_post_id])
      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation + 2
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:rows3[0].post_vote })
    } else {
      return res.json({ status: "error", message:"You Already Voted Up"})
    }

      const [postVote] = await pool.query('select post_vote from post where post_id = ?', [post_id])
      let cnt = postVote[0].post_vote += 1
      const [rows2, fields2] = await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])

      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation + 10
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:postVote[0].post_vote })

  } catch (error) {
    console.log(error);
    next(error)
  }

});


router.put("/post/vote/down",isLoggedIn, checkRepVoteDown, async function (req, res, next) {
  const { voter_id, post_id, gotVote_id } = req.body

  try {
    const [check] = await pool.query('SELECT * FROM vote_post where mem_id = ? and post_id = ? ', [voter_id, post_id])
    if (check.length == 0) {
      const [rows1, fields1] = await pool.query('insert into vote_post(mem_id, post_id, vote_status) values(?,?,?)', [voter_id, post_id, "down"])
    } else if(check[0].vote_status == "mid"){
      const [rows1, fields1] = await pool.query('update vote_post set vote_status = ? where vote_post_id = ?', ["down", check[0].vote_post_id])

    } else if(check[0].vote_status == "up"){
      const [rows3, fields3] = await pool.query('select post_vote from post where post_id = ?', [post_id])
      let cnt = rows3[0].post_vote -= 1
      const [rows2, fields2] = await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])

      const [rows1, fields1] = await pool.query('update vote_post set vote_status = ? where vote_post_id = ?', ["mid", check[0].vote_post_id])
      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation - 10
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:rows3[0].post_vote })
    } else {
      return res.json({ status: "error", message:"You Already Voted down"})
    }

      const [postVote] = await pool.query('select post_vote from post where post_id = ?', [post_id])
      let cnt = postVote[0].post_vote -= 1
      const [rows2, fields2] = await pool.query('update post set post_vote = ? where post_id = ?', [cnt, post_id])

      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
      const rep_voter = rows0[0].reputation - 1
      const [rows4, fields4] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep_gotVote = rows4[0].reputation - 2
      await pool.query('update member set reputation = ? where mem_id = ?', [rep_voter, voter_id])
      await pool.query('update member set reputation = ? where mem_id = ?', [rep_gotVote, gotVote_id])
      return res.json({ status: "success", vote:postVote[0].post_vote })

  } catch (error) {
    console.log(error);
    next(error)
  }
})


router.put("/comm/vote/up", isLoggedIn, checkRepVoteUp, async function (req, res, next) {
  const { voter_id, comm_id, gotVote_id } = req.body
  console.log( voter_id, comm_id, gotVote_id);

  try {
    const [check] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ? ', [voter_id, comm_id])
    if (check.length == 0) {
      const [rows1, fields1] = await pool.query('insert into vote_comment(mem_id, comm_id, vote_status) values(?,?,?)', [voter_id, comm_id, "up"])
    } else if(check[0].vote_status == "mid"){
      const [rows1, fields1] = await pool.query('update vote_comment set vote_status = ? where vote_comment_id = ?', ["up", check[0].vote_comment_id])

    } else if(check[0].vote_status == "down"){
      const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
      let cnt = rows3[0].comm_vote += 1
      const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

      const [rows1, fields1] = await pool.query('update vote_comment set vote_status = ? where vote_comment_id = ?', ["mid", check[0].vote_comment_id])
      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation + 2
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:rows3[0].comm_vote })
    } else {
      return res.json({ status: "error", message:"You Already Voted Up"})
    }

      const [commVote] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
      let cnt = commVote[0].comm_vote += 1
      const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation + 10
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:commVote[0].comm_vote })
    // const [rows, fields] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
    // if (rows.length == 0) {
    //   const [rows1, fields1] = await pool.query('insert into vote_comment(mem_id, comm_id) values(?,?)', [voter_id, comm_id])
    //   const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
    //   let cnt = rows3[0].comm_vote += 1
    //   const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

    //   const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
    //   const rep = rows0[0].reputation + 10
    //   const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
    //   return res.json({ status: "success", vote:rows3[0].comm_vote })
    // } else {
    //   return res.json({ status: "error" })
    // }

  } catch (error) {
    console.log(error);
    next(error)
  }

})



router.put("/comm/vote/down", isLoggedIn, checkRepVoteDown, async function (req, res, next) {
  const { voter_id, comm_id, gotVote_id } = req.body
  try {
    const [check] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ? ', [voter_id, comm_id])
    if (check.length == 0) {
      const [rows1, fields1] = await pool.query('insert into vote_comment(mem_id, comm_id, vote_status) values(?,?,?)', [voter_id, comm_id, "down"])
    } else if(check[0].vote_status == "mid"){
      const [rows1, fields1] = await pool.query('update vote_comment set vote_status = ? where vote_comment_id = ?', ["down", check[0].vote_comment_id])

    } else if(check[0].vote_status == "up"){
      const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
      let cnt = rows3[0].comm_vote -= 1
      const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

      const [rows1, fields1] = await pool.query('update vote_comment set vote_status = ? where vote_comment_id = ?', ["mid", check[0].vote_comment_id])
      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep = rows0[0].reputation - 10
      const [rows4, fields4] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, gotVote_id])
      return res.json({ status: "success", vote:rows3[0].comm_vote })
    } else {
      return res.json({ status: "error", message:"You Already Voted down"})
    }

      const [commVote] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
      let cnt = commVote[0].comm_vote -= 1
      const [rows2, fields2] = await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

      const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
      const rep_voter = rows0[0].reputation - 1
      const [rows4, fields4] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
      const rep_gotVote = rows4[0].reputation - 2
      await pool.query('update member set reputation = ? where mem_id = ?', [rep_voter, voter_id])
      await pool.query('update member set reputation = ? where mem_id = ?', [rep_gotVote, gotVote_id])
      return res.json({ status: "success", vote:commVote[0].comm_vote })
    // const [rows, fields] = await pool.query('SELECT * FROM vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
    // if (rows.length != 0) {
    //   const [rows1, fields1] = await pool.query('delete from vote_comment where mem_id = ? and comm_id = ?', [voter_id, comm_id])
    //   const [rows3, fields3] = await pool.query('select comm_vote from comment where comm_id = ?', [comm_id])
    //   let cnt = rows3[0].comm_vote -= 1
    //   await pool.query('update comment set comm_vote = ? where comm_id = ?', [cnt, comm_id])

    //   const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
    //   const rep_voter = rows0[0].reputation - 1
    //   const [rows4, fields4] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [gotVote_id])
    //   const rep_gotVote = rows4[0].reputation - 2
    //   await pool.query('update member set reputation = ? where mem_id = ?', [rep_voter, voter_id])
    //   await pool.query('update member set reputation = ? where mem_id = ?', [rep_gotVote, gotVote_id])
    //   return res.json({ status: "success", vote:rows3[0].comm_vote })
    // } else {
    //   return res.json({ status: "error" })
    // }

  } catch (error) {
    console.log(error);
    next(error)
  }

});






router.put("/answer/accept", isLoggedIn, ownerQuestion, async function (req, res, next) {
  const { answer_id } = req.body
  // console.log(req.body);
  try {
    const [rows0, fields0] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [answer_id])
    const rep = rows0[0].reputation + 15
    const [rows1, fields1] = await pool.query('update member set reputation = ? where mem_id = ?', [rep, answer_id])
    return res.json({ status: "success", message: "You got Correctly Answer" })

  } catch (error) {
    next(error)
  }

});






exports.router = router;