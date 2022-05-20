const dotenv = require('dotenv');
const { database } = require('pg/lib/defaults');
dotenv.config()
const pool = require('../db_connect')

module.exports.faculty_get = (req, res) => {
    //sql query - get faculties: [{faculty_id, name}]
    const query = {
        text: 'SELECT faculty_id as id, name FROM faculties'
    }

    pool.query(query.text)
    .then(data => {
        if(data.rowCount) {
            res.render('faculties', { faculties: data.rows})
        } else { return res.status(404).json('faculties not found')}
    })
    .catch(err => {
        console.log(err);
    })
}