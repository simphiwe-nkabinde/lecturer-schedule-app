DROP DATABASE IF EXISTS lecturer_schedule_app;
CREATE DATABASE lecturer_schedule_app;

DROP TABLE IF EXISTS public.faculties CASCADE;
CREATE TABLE public.faculties(
	faculty_id INT NOT NULL, 
	name varchar(100),
    Primary Key(faculty_id)
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

DROP TABLE IF EXISTS public.departments CASCADE;
CREATE TABLE public.departments(
	department_id serial NOT NULL,
    faculty_id INT,
	name varchar(100),
    Primary Key(department_id),
    FOREIGN KEY (faculty_id) REFERENCES public.faculties (faculty_id)
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

DROP TABLE IF EXISTS public.periods CASCADE;
CREATE TABLE public.periods(
   period_id INT NOT NULL,
   time varchar(50),
   primary Key(period_id)
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

DROP TABLE IF EXISTS public.students CASCADE;
CREATE TABLE public.students(
	student_id serial NOT NULL,
    name varchar(100),
    email varchar(100) UNIQUE,
    password varchar(50),
    department_id INT NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(student_id),
    FOREIGN KEY (department_id) REFERENCES public.departments (department_id)
);
INSERT INTO public.students (name, email, department_id, password)
VALUES
    ('sizwe', 'sizwe@email.com', 10, 'sizwe123'),
    ('tshepo', 'tshepo@email.com', 21, 'tshepo123'),
    ('luyanda', 'luyanda@email.com', 32, 'luyanda123'),
    ('amanda', 'amanda@email.com', 43, 'amanda123');
    ('jabob', 'jacob@email.com', 1, 'jabob123');

DROP TABLE IF EXISTS public.lecturers CASCADE;
CREATE TABLE public.lecturers(
	lecturer_id serial NOT NULL, 
    name varchar(100),
    email varchar(100) UNIQUE,
    password varchar(50),
    faculty_id INT NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(lecturer_id),
    FOREIGN KEY (faculty_id) REFERENCES public.faculties (faculty_id)
);
INSERT INTO public.lecturers (name, email, faculty_id, password)
VALUES
    ('david Khumbu', 'david@email.com', 1, 'david123'),
    ('sipho ndaba', 'sipho@email.com', 3, 'sipho123'),
    ('karabo morena', 'karabo@email.com', 5, 'karabo123'),
    ('tina vanwyke', 'tina@email.com', 4, 'tina123');

DROP TABLE IF EXISTS public.admins CASCADE;
CREATE TABLE public.admins(
	admin_id serial NOT NULL, 
    name varchar(100),
    email varchar(100) UNIQUE,
    password varchar(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(admin_id)
);
INSERT INTO public.admins (name, email, password)
VALUES
    ('sihle', 'sipho@email.com', 'sihle123');
    ('thomas', 'thomas@email.com', 'thomas123');
    ('luke', 'luke@email.com', 'luke123');
    ('themba', 'themba@email.com', 'themba123');
    ('ntokozo', 'ntokozo@email.com', 'ntokozo123');

DROP TABLE IF EXISTS public.schedules CASCADE;
CREATE TABLE public.schedules
(
    schedule_id SERIAL NOT NULL,
    lecturer_id integer,
    period_id integer,
    monday varchar(255),
    tuesday varchar(255),
    wednesday varchar(255),
    thursday varchar(255),
    friday varchar(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (schedule_id),
    FOREIGN KEY (lecturer_id) REFERENCES public.lecturers (lecturer_id) ON DELETE CASCADE,
    FOREIGN KEY (period_id) REFERENCES public.periods (period_id)
);
INSERT INTO public.schedules (lecturer_id, period_id, monday, tuesday, wednesday, thursday, friday)
VALUES
    (1, 1, 'consultation', 'class: dsov23', 'industry visits', '', 'module: fdr195'),
    (1, 2, 'consultation', '', 'industry visits', 'practical', ''),
    (1, 3, '', 'module: fdr195', 'industry visits', '', ''),
    (1, 4, 'class: dsov23', 'module: fdr195', 'industry visits', '', ''),
    (1, 5, 'consultation', '', 'industry visits', 'practical', 'class: dsov23'),
    (1, 6, '', 'class: dsov23', 'industry visits', 'practical', ''),
    (1, 7, 'consultation', '', 'industry visits', 'practical', ''),
    (1, 8, 'class: dsov23', '', 'industry visits', 'module: fdr195', '');
