const dotenv = require('dotenv');
dotenv.config()
const pool = require('../db_connect')

module.exports.faculty_get = (req, res) => {
    //sql query - get faculties: [{faculty_id, name}]
    res.render('faculty', { title: 'faculty page' });
}