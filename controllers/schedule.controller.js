const dotenv = require('dotenv');
const { query } = require('express');
dotenv.config()
const pool = require('../db_connect')

module.exports.schedule_get = (req, res) => {
    const lecturerId = req.params.lecturerId;

    const query = {
        text: 'SELECT s.*, p.*, l.name FROM (schedules s JOIN periods p ON s.period_id = p.period_id) JOIN lecturers l ON s.lecturer_id = l.lecturer_id WHERE s.lecturer_id = $1 ORDER BY s.period_id;',
        values: [lecturerId]
    }

    pool.query(query.text, query.values)
    .then(data => {
        res.render('schedule', { schedule: data.rows, user: req.user });
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
        res.render('schedule_edit', { schedule: data.rows , lecturer_id: lecturerId, user: req.user});
    })
    .catch(err => {
        console.log(err);
    })
}

//create new schedule
module.exports.schedule_create = (req, res) => {
    const lecturer_id = req.params.lecturerId
    //sql query - create 8 rows in schedules with res values
    let query = {
        text: 'INSERT INTO schedules (lecturer_id, period_id) VALUES($9, $1), ($9, $2), ($9, $3), ($9, $4), ($9, $5), ($9, $6), ($9, $7), ($9, $8);',
        values: [1, 2, 3, 4, 5, 6, 7, 8, lecturer_id]
    }
    pool.query(query.text, query.values)
    .then(data => {
        res.json(lecturer_id);
    })
    .catch(err => {
        console.log(err);
    })
    //reload page after successfule query
}
//delete schedule
module.exports.schedule_delete = (req, res) => {
    const lecturer_id = req.params.lecturerId
    //sql query - create 8 rows in schedules with res values
    let query = {
        text: 'DELETE FROM schedules WHERE lecturer_id = $1;',
        values: [lecturer_id]
    }
    pool.query(query.text, query.values)
    .then(data => {
        res.json(lecturer_id);
    })
    .catch(err => {
        console.log(err);
    })
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