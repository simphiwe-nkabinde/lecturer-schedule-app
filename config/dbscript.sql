DROP TABLE IF EXISTS public.faculties;
CREATE TABLE public.faculties(
	ID INT NOT NULL, 
	name varchar(100),
    Primary Key(ID)
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
	ID serial NOT NULL,
    facultyID INT,
	name varchar(100),
    Primary Key(ID),
    FOREIGN KEY (facultyID) REFERENCES public.faculties (ID)
);
INSERT INTO public.departments (facultyID, name)
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
   ID INT NOT NULL,
   time varchar(50),
   primary Key(ID)
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
	ID serial NOT NULL, 
    facultyID integer,
    name varchar(100),
    email varchar(100),
    password varchar(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID),
    FOREIGN KEY (facultyID) REFERENCES public.faculties (ID)
);

CREATE TABLE public.lecturers(
	ID serial NOT NULL, 
    name varchar(100),
    email varchar(100),
    password varchar(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.alerts(
	ID serial NOT NULL, 
    lectureID integer,
	message varchar(255),
	created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID),
    FOREIGN KEY (lectureID) REFERENCES public.lecturers (ID)
);
CREATE TABLE public.schedules
(
    ID SERIAL NOT NULL,
    lectureID integer,
    periodID integer,
    departmentID integer,
    monday varchar(255),
    tuesday varchar(255),
    wednesday varchar(255),
    thursday varchar(255),
    friday varchar(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID),
    FOREIGN KEY (lectureID) REFERENCES public.lecturers (ID),
    FOREIGN KEY (departmentID) REFERENCES public.departments (ID),
    FOREIGN KEY (periodID) REFERENCES public.periods (ID)
);

CREATE UNIQUE INDEX student_unique_lower_email_idx
    ON public.student (lower(email));

CREATE UNIQUE INDEX lecturers_unique_lower_email_idx
    ON public.lecturers (lower(email));
