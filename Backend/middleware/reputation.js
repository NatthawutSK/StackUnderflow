const pool = require('../config.js')


async function checkRepVoteUp(req, res, next) {
    const {voter_id} = req.body
    const [rows, fields] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
    if(rows[0].reputation < 15){
        return res.json({status:"error", message:"You need at lease 15 reputation to vote up"})
    }
    next()
}

async function checkRepVoteDown(req, res, next) {
    const {voter_id} = req.body
    const [rows, fields] = await pool.query('SELECT reputation FROM member where mem_id = ? ', [voter_id])
    if(rows[0].reputation < 125){
        return res.json({status:"error", message:"You need at lease 125 reputation to vote down"})
    }
    next()
}



module.exports = {
    checkRepVoteUp,
    checkRepVoteDown,

}

