# lecturer-schedule-app
A responsive web application that allows University lecturers to manage their public teaching schedule and for registered 
students to have easy access to it. Lecturers can create, delete and update their timetable. Lecturers can add a notification 
message for students to see. Students can view each lecturer's timetable schedule and download it in pdf format. An admin user can remove
student or lecturer users from the database and make changes to lecturers' timetable schedule.

## Installation

1. clone the repo into a local directory on your machine.
```
git clone https://github.com/simphiwe-nkabinde/lecturer-schedule-app.git 
```

2. install all dependancies using node package manager (npm)
```
cd lecturer-schedule-app
npm intall
```
3. create a psql database and run the dbscript.sql script to populate your databse with tables and some mock data.
 
4. add a ```.env``` file to the project directory with database connection credentials
```
PG_USER=*
PG_PASSWORD=*
PG_HOST=*
PG_PORT=* 
PG_DATABASE=*
```

## Usage

run ```npm start``` and open the browser at http://localhost:3000
