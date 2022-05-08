const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config()
const pool = require('../db_connect')

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


module.exports.register_get = (req, res) => {
    res.render('register', { title: 'Register page' });
}
module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Login page' })
}

/**
 * saves new user email and password into DB
 * @param {*} req { query.email, query.password }
 * @param {*} res 
 */
module.exports.register_post = (req, res) => {
    const { name, email, password } = req.body;
    // node-postgres
    let query = {
        text: `INSERT INTO students ( name, email, password ) VALUES ($1, $2, $3) RETURNING id, name`,
        value: [name, email, password]
    }

    pool.query(query.text, query.value)
    .then(data => {
        if (data.id) {
            return res.redirect('/login')
        } else { res.status(404).json('error, could not register') }
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json(error)
    })
}
/**
 * verifies user email and password against DB
 * @param {*} req { query.email, query.password , cookie}
 * @param {*} res 
 */
module.exports.login_post = (req, res) => {
    const { email, password } = req.body;
    // node-postgres
    let query = {
        text: `SELECT id , name, email FROM students WHERE email = $1 AND password = $2;`,
        value: [email, password]
    }

    pool.query(query.text, query.value)
    .then(data => {
        if (data.rowCount) {
            return res.redirect('/faculty')
        } else { res.status(404).json('user does not exist')}
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json(error)
    })
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