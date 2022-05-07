const dotenv = require('dotenv');
dotenv.config()
const pool = require('../db_connect')

module.exports.lecturer_get = (req, res) => {
    //res /:facultyId
    //sql query - get lecturers: [{lecturer_id, name}]
    res.render('lecturer', { title: 'lecturer page' })
}