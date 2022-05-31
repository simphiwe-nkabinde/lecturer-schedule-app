const dotenv = require('dotenv');
const { query } = require('express');
dotenv.config()
const pool = require('../db_connect')

module.exports.schedule_get = (req, res) => {
    const lecturerId = req.params.lecturerId;

    const query = {
        text: 'SELECT schedules.*, periods.* FROM schedules INNER JOIN periods ON schedules.period_id = periods.period_id WHERE lecturer_id = $1',
        values: [lecturerId]
    }

    pool.query(query.text, query.values)
    .then(data => {
        if(data.rowCount) {
            res.render('schedule', { schedule: data.rows });
        } else {res.status(404).json('error, schedule not found')}
    })
    .catch(err => {
        console.log(err);
    })
}

//create new schedule
module.exports.schedule_create = (req, res) => {
    //res.body { lecturerId, departmentId }
    //sql query - create 8 rows in schedules with res values
    //reload page after successfule query
}

module.exports.schedule_update = (req, res) => {
    //res /:scheduleId , body{ monday, tuesday, wednesday, thursday, friday }
    //sql query - update schedules
    res.render('schedule', { title: 'lecturer page' })
}