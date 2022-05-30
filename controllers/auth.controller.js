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

const createToken = (payload) => {
    return jwt.sign(payload, 'w')
}


module.exports.register_get = (req, res) => {
    //sql query - get faculties: [{faculty_id, name}]
    const query = {
        text: 'SELECT faculty_id as id, name FROM faculties'
    }

    pool.query(query.text)
    .then(data => {
        if(data.rowCount) {
            res.render('register', { title: 'Register page', faculties: data.rows });
        } else { return res.status(404).json('faculties not found')}
    })
    .catch(err => {
        console.log(err);
    })
}
module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Login page' })
}
module.exports.register_post = (req, res) => {
    const { name, email, password, departmentId } = req.body;
    let query = {
        text: `INSERT INTO students ( name, email, password , department_id) VALUES ($1, $2, $3, $4) RETURNING student_id as id, name, department_id`,
        value: [name, email, password, departmentId]
    }
    pool.query(query.text, query.value)
    .then(data => {
        if (data.rows) {
            console.log(data.rows);
            return res.json(`auth/login`)
        } else { res.status(404).json('error, could not register') }
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json(err)
    })
}

module.exports.loginStudent_post = (req, res) => {
    const { email, password } = req.body;
    // node-postgres
    let query = {
        text: `SELECT student_id as id , name, email, faculty_id FROM students WHERE email = $1 AND password = $2;`,
        value: [email, password]
    }

    pool.query(query.text, query.value)
    .then(data => {
        if (data.rowCount) {
            payload = {
                id: data.id,
                name: data.name,
                email: data.email,
                faculty_id: data.faculty_id,
                userType: 'student'
            }
            let token = createToken(payload)
            res.cookie('jwt', token, cookieOptions) 
            return res.redirect('/faculty')
        } else { res.status(404).json('user does not exist')}
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json(error)
    })
}
module.exports.loginLecturer_post = (req, res) => {
    const { email, password } = req.body;
    // node-postgres
    let query = {
        text: `SELECT lecturer_id as id , name, email FROM lecturers WHERE email = $1 AND password = $2;`,
        value: [email, password]
    }

    pool.query(query.text, query.value)
    .then(data => {
        if (data.rowCount) {
            payload = {
                id: data.id,
                name: data.name,
                email: data.email,
                userType: 'lecturer'
            }
            let token = createToken(payload)
            res.cookie('jwt', token, cookieOptions) 
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