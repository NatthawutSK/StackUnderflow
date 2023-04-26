var jwt = require('jsonwebtoken');
const secret = 'riau'



async function isLoggedIn (req, res, next) {
    let authorization = req.headers.authorization
    // console.log(authorization);

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }


    // verify token เพื่อส่งเอา user ออกไป req.user = users[0]
            //  let [part1, part2] = authorization.split(' ')
            // const token = req.headers.authorization.split(' ')[1]
            // console.log(token);
            var decoded = jwt.verify(part2,secret);
            // res.json({decoded,status:'ok'})
            console.log(decoded.user);
            req.user = decoded.user

    // // Check token
    // const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    // const token = tokens[0]
    // if (!token) {
    //     return res.status(401).send('You are not logged in')
    // }

    // // Set user
    // const [users] = await pool.query(
    //    'SELECT id, username, first_name, last_name, email, picture, mobile, join_date, role ' + 
    //     'FROM users WHERE id = ?', [token.user_id]
    // )
    // req.user = users[0]

    next()
}

module.exports = {
    isLoggedIn
}

