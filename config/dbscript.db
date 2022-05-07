CREATE TABLE public.faculties(
	ID serial NOT NULL, 
	name varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);

CREATE TABLE public.department(
	ID serial NOT NULL,
    facultyID integer,
	name varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);

CREATE TABLE public.student(
	ID serial NOT NULL, 
    facultyID integer,
    name varchar(100),
    email varchar(100),
    password varchar(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
	
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
	Primary Key(ID)
);
CREATE TABLE public.schedules
(
    id SERIAL NOT NULL,
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
    PRIMARY KEY (id)
);
CREATE TABLE public.period(
   ID SERIAL NOT NULL,
   time varchar(50),
   created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
   updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
   primary Key(ID)

);


ALTER TABLE public.department
    ADD FOREIGN KEY (facultyID)
    REFERENCES public.faculties (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.student
    ADD FOREIGN KEY (facultyID)
    REFERENCES public.faculties (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.alerts
    ADD FOREIGN KEY (lectureID)
    REFERENCES public.lecturers (ID)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.schedules
    ADD FOREIGN KEY (lectureID)
    REFERENCES public.lecturers (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.schedules
    ADD FOREIGN KEY (departmentID)
    REFERENCES public.department (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.schedules
    ADD FOREIGN KEY (periodID)
    REFERENCES public.period (ID)
    ON DELETE CASCADE
    NOT VALID;

	
CREATE UNIQUE INDEX student_unique_lower_email_idx
    ON public.student (lower(email));

CREATE UNIQUE INDEX lecturers_unique_lower_email_idx
    ON public.lecturers (lower(email));
