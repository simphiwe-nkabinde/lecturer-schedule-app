DROP DATABASE IF EXISTS lecturer_schedule_app;
CREATE DATABASE lecturer_schedule_app;

\c lecturer_schedule_app;


DROP TABLE IF EXISTS public.faculties;
CREATE TABLE public.faculties(
	id INT NOT NULL, 
	name varchar(100),
    Primary Key(id)
);
INSERT INTO public.faculties
VALUES
    (1, 'Art and Design'),
    (2, 'economics & finance'),
    (3, 'engineering & the built environment'),
    (4, 'humanitites'),
    (5, 'information & communication technology'),
    (6, 'management sciences'),
    (7, 'science');

DROP TABLE IF EXISTS public.departments;
CREATE TABLE public.departments(
	id serial NOT NULL,
    faculty_id INT,
	name varchar(100),
    Primary Key(id),
    FOREIGN KEY (faculty_id) REFERENCES public.faculties (id)
);
INSERT INTO public.departments (faculty_id, name)
VALUES
    (1, 'Design Studies'),
    (1, 'Fine & Studio Arts'),
    (1, 'Interior Design'),
    (1, 'Performing Arts'),
    (1, 'Visual Communication'),
    (2, 'Accounting'),
    (2, 'Auditing'),
    (2, 'Economics'),
    (2, 'Finance and Investment'),
    (2, 'Public Sector Finance'),
    (3, 'Architecture and Industrial Design'),
    (3, 'Building Sciences'),
    (3, 'Chemical, Metallurgical and Materials Engineering'),
    (3, 'Civil Engineering'),
    (3, 'Electrical Engineering'),
    (3, 'Geomatics'),
    (3, 'Industrial Engineering'),
    (3, 'Mechanical and Mechatronics Engineering'),
    (4, 'Applied Languages'),
    (4, 'Integrated Communication'),
    (4, 'Journalism'),
    (4, 'Law'),
    (4, 'Public Management'),
    (4, 'Safety and Security Management'),
    (4, 'School of Education'),
    (4, 'Distance Education'),
    (5, 'Computer Science'),
    (5, 'Computer Systems Engineering'),
    (5, 'Informatics'),
    (5, 'Information Technology'),
    (6, 'Business and Information Management Services'),
    (6, 'Business School'),
    (6, 'Hospitality Management'),
    (6, 'Management and Entrepreneurship'),
    (6, 'Marketing, Supply Chain Management and Sport Management'),
    (6, 'Operations Management'),
    (6, 'People Management and Development'),
    (6, 'Tourism Management'),
    (7, 'Adelaide Tambo School of Nursing Science'),
    (7, 'Animal Sciences'),
    (7, 'Biomedical Sciences'),
    (7, 'Biotechnology and Food Technology'),
    (7, 'Chemistry'),
    (7, 'Crop Sciences'),
    (7, 'Environmental Health'),
    (7, 'Environmental, Water and Earth Sciences'),
    (7, 'Horticulture'),
    (7, 'Mathematics and Statistics'),
    (7, 'Nature Conservation'),
    (7, 'Pharmaceutical Sciences'),
    (7, 'Physics'),
    (7, 'Sport, Rehabilitation and Dental Sciences');

DROP TABLE IF EXISTS public.periods;
CREATE TABLE public.periods(
   id INT NOT NULL,
   time varchar(50),
   primary Key(id)
);
INSERT INTO public.periods 
VALUES
    (1, '08:00 - 09:00'),
    (2, '09:00 - 10:00'),
    (3, '10:00 - 11:00'),
    (4, '11:00 - 12:00'),
    (5, '12:00 - 13:00'),
    (6, '13:00 - 14:00'),
    (7, '14:00 - 15:00'),
    (8, '15:00 - 16:00');

CREATE TABLE public.students(
	id serial NOT NULL,
    name varchar(100),
    email varchar(100),
    password varchar(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(id),
);

CREATE TABLE public.lecturers(
	id serial NOT NULL, 
    name varchar(100),
    email varchar(100),
    password varchar(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(id)
);
INSERT INTO public.lecturers (name, email, password)
VALUES
    ('david', 'david@email.com', 'david123'),
    ('sipho', 'sipho@email.com', 'sipho123'),
    ('karabo', 'karabo@email.com', 'karabo123'),
    ('tina', 'tina@email.com', 'tina123');

DROP TABLE IF EXISTS public.lecturer_department;
CREATE TABLE public.lecturer_department(
    id SERIAL NOT NULL,
    lecturer_id INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY kEY (id),
    FOREIGN KEY (lecturer_id) REFERENCES public.lecturers (id),
    FOREIGN KEY (department_id) REFERENCES public.departments (id)
);
INSERT INTO public.lecturer_department (lecturer_id, department_id)
VALUES
    (1, 5),
    (1, 10),
    (1, 15),
    (1, 20),
    (2, 25),
    (2, 30),
    (2, 35),
    (2, 40),
    (3, 45),
    (3, 50),
    (3, 47),
    (3, 44),
    (4, 41),
    (4, 38),
    (4, 35),
    (4, 33);

CREATE TABLE public.alerts(
	id serial NOT NULL, 
    lecturer_id integer,
	message varchar(255),
	created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(id),
    FOREIGN KEY (lecturer_id) REFERENCES public.lecturers (id)
);

DROP TABLE IF EXISTS public.schedules;
CREATE TABLE public.schedules
(
    id SERIAL NOT NULL,
    lecturer_id integer,
    period_id integer,
    department_id integer,
    monday varchar(255),
    tuesday varchar(255),
    wednesday varchar(255),
    thursday varchar(255),
    friday varchar(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (lecturer_id) REFERENCES public.lecturers (id),
    FOREIGN KEY (department_id) REFERENCES public.departments (id),
    FOREIGN KEY (period_id) REFERENCES public.periods (id)
);
INSERT INTO public.schedules (lecturer_id, period_id, department_id, monday, tuesday, wednesday, thursday, friday)
VALUES
    (1, 1, 5, 'consultation', 'class: dsov23', 'industry visits', '', 'module: fdr195'),
    (1, 2, 5, 'consultation', '', 'industry visits', 'practical', ''),
    (1, 3, 5, '', 'module: fdr195', 'industry visits', '', ''),
    (1, 4, 5, 'class: dsov23', 'module: fdr195', 'industry visits', '', ''),
    (1, 5, 5, 'consultation', '', 'industry visits', 'practical', 'class: dsov23'),
    (1, 6, 5, '', 'class: dsov23', 'industry visits', 'practical', ''),
    (1, 7, 5, 'consultation', '', 'industry visits', 'practical', ''),
    (1, 8, 5, 'class: dsov23', '', 'industry visits', 'module: fdr195', '');

CREATE UNIQUE INDEX student_unique_lower_email_idx
    ON public.student (lower(email));

CREATE UNIQUE INDEX lecturers_unique_lower_email_idx
    ON public.lecturers (lower(email));


GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public.lecturer_schedule_app 
TO admin;