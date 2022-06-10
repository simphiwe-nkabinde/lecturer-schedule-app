const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv');
dotenv.config()
const pool = require('../db_connect')

const cookieOptions = {
    httpOnly: false, 
    maxAge: 1000 * 60 * 60 * 2,
    secure: false
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
    const { name, email, password, role, departmentId } = req.body;
    let query = {
        text: '',
        value: [name, email, password]
    }

    if (role == 'student') {
        query.text = `INSERT INTO students ( name, email, password , department_id) VALUES ($1, $2, $3, $4) RETURNING student_id as id, name, department_id`;
        query.value.push(departmentId)
    }
    else if (role == 'lecturer')
        query.text = `INSERT INTO lecturers ( name, email, password ) VALUES ($1, $2, $3) RETURNING lecturer_id as id, name`;
    
    else if (role == 'admin')
        query.text = `INSERT INTO admin ( name, email, password ) VALUES ($1, $2, $3) RETURNING lecturer_id as id, name`;
    

    console.log(query);
    pool.query(query.text, query.value)
    .then(data => {
        console.log(data);
        if (data.rows) {
            console.log(data.rows);
            return res.json(data.rows[0])
        } else { res.status(404).json('error, could not register') }
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json(err)
    })
}

module.exports.login_post = (req, res) => {
    const { email, password, role } = req.body;

    let query = {
        text: ``,
        value: [email, password]
    }
    if (role == 'student')
        query.text = `SELECT student_id as id , name, email, department_id FROM students WHERE email = $1 AND password = $2;`
    else if (role == 'lecturer')
        query.text = `SELECT lecturer_id as id , name, email FROM lecturers WHERE email = $1 AND password = $2;`;
    else if (role == 'admin')
        query.text = `SELECT admin_id as id , name, email FROM admin WHERE email = $1 AND password = $2;`


    pool.query(query.text, query.value)
    .then(data => {
        if (data.rowCount) {
            payload = {
                id: data.rows[0].id,
                name: data.rows[0].name,
                email: data.rows[0].email,
                departmentId: role == 'student' ? data.rows[0].department_id : '',
                userType: role
            }
            let token = createToken(payload)
            res.cookie('USER_TOKEN', token, cookieOptions)
            return res.status(200).json(payload)

        } else { res.status(404).json('incorrect email or password')}
    })
    .catch(err => {
        console.log(err);
        return res.status(404).json(err)
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
    res.cookie('USER_TOKEN', '', cookieOptions)
    res.json({userStatus: 'logged out'})
}

module.exports.getStudents = (req, res) => {
    let queryText = 'SELECT student_id as id, name, email FROM students;'

    pool.query(queryText)
    .then(data => {
        if(data.rowCount) {
            res.render('all_students', { students: data.rows, userEmail:req.userEmail });
        } else { return res.status(404).json('students not found')}
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports.getLecturers = (req, res) => {
    let queryText = 'SELECT lecturer_id as id, name, email FROM lecturers;'

    pool.query(queryText)
    .then(data => {
        if(data.rowCount) {
            res.render('all_lecturers', { lecturers: data.rows, userEmail:req.userEmail });
        } else { return res.status(404).json('lecturers not found')}
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports.removeUser = (req, res) => {
    const role = req.params.role
    const id = req.params.id
    let query = {
        text: `DELETE FROM ${role}s where ${role}_id = $1`,
        values: [id]
    }

    pool.query(query.text, query.values)
    .then(data => {
        if(data.rowCount) {
            res.json(`${role} removed`)
        } else { res.json(`${role} does not exist`) }
    })
    .catch(err => {
        console.log(err);
        res.json(`error removing ${role}`)
    })
}