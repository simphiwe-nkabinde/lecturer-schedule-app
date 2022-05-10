const jwt = require('jsonwebtoken')
/**
 * verifies user's jwt token stored in browser cookies
 * @param {*} req { cookies.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next next()
 * @returns 
 */
module.exports.student = (req, res, next) => {
    let token = req.cookies.jwt
    console.log(token);
    if (token) {
        let decoded = jwt.verify(token, 'w')
        if (decoded) {
            if (decoded.faculty_id) {
                next()
            }
            
        } else {
            return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        res.status(401).json({error: 'token not found. Please Login'})
    }
}