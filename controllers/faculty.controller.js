const dotenv = require('dotenv');
dotenv.config()


module.exports.faculty_get = (req, res) => {
    //sql query - get faculties: [{faculty_id, name}]
    res.render('faculty', { title: 'faculty page' });
}

module.exports.faculty_post = (req, res) => {
    //res /:facultyId
    //sql query - get lecturers: [{lecturer_id, name}]
    res.render('lecturer', { title: 'lecturer page' })
}