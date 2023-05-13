var jwt = require('jsonwebtoken');
const secret = 'riau'



async function isLoggedIn (req, res, next) {
    let authorization = req.headers.authorization
    // console.log(authorization);

    if (!authorization) {
        return res.json({ role: "guess", message:"You Are Not Login" })
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.json({ role: "guess", message:"You Are Not Login"})
    }
    var decoded = jwt.verify(part2,secret);
    req.user = decoded.user
    next()
}

module.exports = {
    isLoggedIn
}

