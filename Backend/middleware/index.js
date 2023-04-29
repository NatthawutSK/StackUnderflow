var jwt = require('jsonwebtoken');
const secret = 'riau'



async function isLoggedIn (req, res, next) {
    let authorization = req.headers.authorization
    // console.log(authorization);

    if (!authorization) {
        return res.json({ role: "guess" })
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.json({ role: "guess" })
    }
    var decoded = jwt.verify(part2,secret);
    req.user = decoded.user


    // verify token เพื่อส่งเอา user ออกไป req.user = users[0]
            //  let [part1, part2] = authorization.split(' ')
            // const token = req.headers.authorization.split(' ')[1]
            // console.log(token);
            // res.json({decoded,status:'ok'})
            // console.log(decoded.user);

    next()
}

module.exports = {
    isLoggedIn
}

