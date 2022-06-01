const dotenv = require('dotenv');
dotenv.config()
const pool = require('../db_connect')

module.exports.lecturer_get = (req, res) => {
    // const departmentId = req.params.id
    //sql query - get lecturers: [{lecturer_id, name}]
    const query = {
        // text: 'SELECT lecturers.lecturer_id as id, lecturers.name FROM lecturers INNER JOIN lecturer_department ON lecturer_department.lecturer_id=lecturers.lecturer_id WHERE lecturer_department.department_id = $1',
        text: 'SELECT lecturer_id as id, name FROM lecturers;',
        // values: [departmentId]
    }

    pool.query(query.text)
    .then(data => {
        if(data.rowCount) {
            res.render('lecturer', { lecturers: data.rows })
        } else {res.status(404).json('error. lecturers not found')}
    })
    .catch(err => {
        console.log(err);
    })
}