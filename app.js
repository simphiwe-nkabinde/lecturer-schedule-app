var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
var facultyRoute = require('./routes/faculty.route');
var departmentRoute = require('./routes/department.route');
var lecturerRoute = require('./routes/lecturer.route');
var scheduleRoute = require('./routes/schedule.route');
const { NoAuthentication } = require('./middleware/auth.middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
  origin : "http://lecturer-schedule.herokuapp.com",
  credentials: true,
}))

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/faculty', facultyRoute);
app.use('/department', departmentRoute);
app.use('/lecturer', lecturerRoute);
app.use('/schedule', scheduleRoute);

app.get('/about', NoAuthentication, (req, res) => {
  res.render('about', {title: 'about', user: req.user})
})
app.get('/services', NoAuthentication, (req, res) => {
  res.render('services', {title: 'services', user: req.user})
})
app.get('/team', NoAuthentication, (req, res) => {
  res.render('team' , {title: 'team', user: req.user})
})
app.get('/contact', NoAuthentication, (req, res) => {
  res.render('contact' , {title: 'contact', user: req.user})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
