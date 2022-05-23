const dotenv = require('dotenv');
const { database } = require('pg/lib/defaults');
dotenv.config()
const pool = require('../db_connect')

module.exports.department_get = (req, res) => {
    const facultyId = req.params.id;
    console.log(facultyId);
    //sql query - get faculties: [{faculty_id, name}]
    const query = {
        text: 'SELECT department_id as id, faculty_id, name FROM departments WHERE faculty_id = $1;',
        value: [facultyId]
    }

    pool.query(query.text, query.value)
    .then(data => {
        if(data.rowCount) {
            res.json(data.rows)
        } else { return res.status(404).json('departments not found')}
    })
    .catch(err => {
        console.log(err);
    })
}