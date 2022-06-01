const dotenv = require('dotenv');
const { query } = require('express');
dotenv.config()
const pool = require('../db_connect')

module.exports.schedule_get = (req, res) => {
    const lecturerId = req.params.lecturerId;

    const query = {
        text: 'SELECT schedules.*, periods.* FROM schedules INNER JOIN periods ON schedules.period_id = periods.period_id WHERE lecturer_id = $1 ORDER BY schedules.period_id;',
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

module.exports.schedule_edit_get = (req, res) => {
    const lecturerId = req.params.lecturerId;

    const query = {
        text: 'SELECT schedules.*, periods.* FROM schedules INNER JOIN periods ON schedules.period_id = periods.period_id WHERE lecturer_id = $1 ORDER BY schedules.period_id;',
        values: [lecturerId]
    }

    pool.query(query.text, query.values)
    .then(data => {
        if(data.rowCount) {
            res.render('schedule_edit', { schedule: data.rows });
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
    const id = req.params.id
    const { mon, tue, wed, thu, fri } = req.body
    //sql query - update schedules
    let query = {
        text: 'UPDATE schedules SET monday=$1, tuesday=$2, wednesday=$3, thursday=$4, friday=$5 WHERE schedule_id=$6 RETURNING *',
        values: [mon, tue, wed, thu, fri, id]
    }
    pool.query(query.text, query.values)
    .then(data => {
        if(data.rows) {
            console.log(data.rows);
            res.json(data.rows[0]);
        } else {res.status(404).json('error, could not update')}
    })
    .catch(err => {
        console.log(err);
        res.status(404).json('error, could not update')
    })
}