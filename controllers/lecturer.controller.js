const dotenv = require('dotenv');
dotenv.config()
const pool = require('../db_connect')

module.exports.lecturer_get = (req, res) => {
    const departmentId = req.params.id
    //sql query - get lecturers: [{lecturer_id, name}]
    const query = {
        text: 'SELECT lecturers.ID, lecturers.name FROM lecturers INNER JOIN lecturer_department ON lecturer_department.lecturerID=lecturers.ID WHERE lecturer_department.DepartmentID = $1',
        values: [departmentId]
    }

    pool.query(query.text, query.values)
    .then(data => {
        if(data.rowCount) {
            res.render('lecturer', { lecturers: data.rows })
        } else {res.status(404).json('error. lecturers not found')}
    })
    .catch(err => {
        console.log(err);
    })



}