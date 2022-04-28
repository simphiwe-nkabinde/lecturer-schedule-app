const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config()

const cookieOptions = {
    httpOnly: true, 
    maxAge: 1000 * 60 * 5,
    sameSite: 'none',
    secure: true
}

// create new jwt token for payload
const createToken = (payload) => {
    return jwt.sign(payload, 'w')   // *issue: setting secret to .env.JWT_SECRET == undefined
}

/**
 * saves new user email and password into DB
 * @param {*} req { query.email, query.password }
 * @param {*} res 
 */
module.exports.register = (req, res) => {
    const { email, password } = req.query
    // node-postgres
}

/**
 * verifies user email and password against DB
 * @param {*} req { query.email, query.password , cookie}
 * @param {*} res 
 */
module.exports.login = (req, res) => {
    const { email, password } = req.query
    // node-postgres
}

/**
 * logs out user by removing user jwt token from browser
 * @param {*} req { cookies }
 * @param {*} res { cookie(), json() }
 */
module.exports.logout = (req, res) => {
    console.log(req.cookies);
    //remove user jwt token
    res.cookie('jwt', '', cookieOptions)
    res.json({userStatus: 'logged out'})
}