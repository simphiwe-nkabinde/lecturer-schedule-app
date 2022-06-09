# lecturer-schedule-app
A responsive web application that allows University lecturers to manage their public teaching schedule and for registered 
students to have easy access to it. Lecturers can create, delete and update their timetable. Lecturers can add a notification 
message for students to see. Students can view each lecturer's timetable schedule and download it in pdf format.

## Installation

clone the repo into a local directory on your machine.
```bash
git clone https://github.com/simphiwe-nkabinde/lecturer-schedule-app.git 
```

install all dependancies using the node package manager (npm)
```bash
cd lecturer-schedule-app
npm intall
```
add a ```.env``` file to the project directory with a database connection credentials
```bash
PG_USER=*
PG_PASSWORD=*
PG_HOST=*
PG_PORT=* 
PG_DATABASE=*
```
