const dotenv = require('dotenv');
dotenv.config()


module.exports.schedule_get = (req, res) => {
    //res /:lecturerId
    //sql query - get lecturers: [{lecturer_id, name}]
    res.render('schedule', { title: 'schedule page' })
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