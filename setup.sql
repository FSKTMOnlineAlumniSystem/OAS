DROP DATABASE IF EXISTS OAS;
CREATE DATABASE OAS;

USE OAS;

CREATE TABLE Image(
imageId varchar(10) NOT NULL PRIMARY KEY,
type varchar(11),
    	imageData longblob NOT NULL
);

CREATE TABLE Admin(
    adminId varchar(10) NOT NULL PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    imageId varchar(255) NOT NULL
);
CREATE TABLE Alumni_Event(
    alumniId varchar(10) NOT NULL,
    eventId varchar(10) NOT NULL,
    PRIMARY KEY (alumniId, eventId),
    viewedByAlumni boolean NOT NULL,
    dateTime varchar(255) NOT NULL,
    notificationClosedByAlumni boolean NOT NULL
);
CREATE TABLE Alumni(
    alumniId varchar(10) NOT NULL PRIMARY KEY,
    approvedBy varchar(10) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    icNumber varchar(255) NOT NULL,
    gender varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    department varchar(255) NOT NULL,
    graduated varchar(255) NOT NULL,
    imageId varchar(255) NOT NULL,
    isEmailPublic boolean NOT NULL,
    isActive boolean NOT NULL,
    biography varchar(255) NOT NULL
);


CREATE TABLE Job(
    jobId varchar(10) NOT NULL PRIMARY KEY,
    alumniId varchar(10) NOT NULL,
    title varchar(255) NOT NULL,
    description varchar(10000) NOT NULL,
    salary int(255) unsigned NOT NULL,
    email varchar(255) NOT NULL,
    postedDateTime varchar(255) NOT NULL,
    imageId varchar(255) NOT NULL,
    company varchar(255) NOT NULL,
    location varchar(255) NOT NULL
);

CREATE TABLE Events(
    eventId varchar(10) NOT NULL PRIMARY KEY,
    adminId varchar(10) NOT NULL,
    title varchar(255) NOT NULL,
    dateTime varchar(255) NOT NULL,
    description varchar(10000) NOT NULL,
    imageId varchar(255) NOT NULL,
    location varchar(255) NOT NULL
);
INSERT INTO Admin(
    adminId,
    email,
    password,
    name,
    imageId
  )
VALUES (
    'AD-1',
    'xingyee@gmail.com',
    '12345',
    'Ong Xing Yee',
    'AD-1'
  );
INSERT INTO Admin(
    adminId,
    email,
    password,
    name,
    imageId
  )
VALUES (
    'AD-2',
    'zhaleha5@gmail.com',
    'G3U.XF@kPZb3-^_:',
    'Zhaleha',
    'AD-2'
  );
INSERT INTO Admin(
    adminId,
    email,
    password,
    name,
    imageId
  )
VALUES (
    'AD-3',
    'lbooang@gmail.com',
    'xhspyz@mg6lp',
    'Ang Loon Boo',
    'AD-3'
  );
INSERT INTO Admin(
    adminId,
    email,
    password,
    name,
    imageId
  )
VALUES (
    'AD-4',
    'd@gmail.com',
    '45o51mva9xi',
    'Sivakami a/p Devansh',
    'AD-4'
  );
INSERT INTO Admin(
    adminId,
    email,
    password,
    name,
    imageId
  )
VALUES (
    'AD-5',
    '@gmail.com',
    'nkd231u22!3%b_',
    'Siti Nur Harizah binti Ahman',
    'AD-5'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-1',
    'AL-1',
    'Software Engineer',
    "Have at least a bachelor's degree in software engineering or information technology. Have extensive experience working with various 
programming languages such as Python, Java, and C++",
    '3000',
    'teh@gmail.com',
    '2021-04-04T15:53:53+00:00',
    'J-1',
    'HSBC',
    'Kuala Lumpur'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-2',
    'AL-2',
    'Frond-end developer',
    "Have a degree in Computer Science or similar field.
Be proficient in coding languages such as HTML, CSS, JavaScript, and jQuery.
Understand server-side CSS.",
    '2000',
    'ang@gmail.com',
    '2021-04-04T15:53:53+00:00',
    'J-2',
    'Samsung',
    'Petaling Jaya'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-3',
    'AL-3',
    'Back-end developer',
    'Have a degree in Computer Science.
Familiar with the database, Server and API',
    '3000',
    'lan@gmail.com',
    '2021-04-04T15:53:53+00:00',
    'J-3',
    'Apple',
    'Johor Bharu'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-4',
    'AL-4',
    'Flutter developer',
    'Good understanding in data structures, algorithms, control flows, and general knowledge in the programming language. Have to master Flutter framework',
    '2500',
    'behjiaong@gmail.com',
    '2021-04-04T15:53:53+00:00',
    'J-4',
    'Google',
    'Kuala Lumpur'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-5',
    'AL-5',
    'Forensic computer analyst',
    'Qualification in IT or related field.
Good analytics skills',
    '4000',
    'keat@gmail.com',
    '2021-04-04T15:53:53+00:00',
    'J-5',
    'Top Glove',
    'Shah Alam'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-6',
    'AL-6',
    'Database Analyst',
    'Qualification in IT or related field.
Master Structured Query Language and Python.',
    '3000',
    'ang@gmail.com',
    '2021-04-05T15:53:53+00:00',
    'J-6',
    'HSBC',
    'Kuala Lumpur'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-7',
    'AL-7',
    'Project Manager',
    'Project ManagementProfessional (PMP) certified
Experience in negotiation skills
Excellent communication skills, oral and written',
    '2000',
    'tan@gmail.com',
    '2021-04-05T15:53:53+00:00',
    'J-7',
    'Samsung',
    'Petaling Jaya'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-8',
    'AL-8',
    'Flutter developer',
    'Min. 4 years experience in software development on mobile applications.
Proficient in Flutter, JavaScript, UI/UX, Github and Agile.
Have good problem-solving skills in a fast-paced environment. ',
    '3000',
    'limxt@gmail.com',
    '2021-04-05T15:53:53+00:00',
    'J-8',
    'Apple',
    'Johor Bharu'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-9',
    'AL-9',
    'Vue Developer',
    "Bachelor's degree in IT or higher
3+ years of experience in software development
Strong JavaScript skills, including ES6/ES7 and Typescript
Good HTML5/CSS3 skills
At least intermediate level of written and spoken English",
    '4000',
    'alisa21@gmail.com',
    '2021-04-05T15:53:53+00:00',
    'J-9',
    'Google',
    'Kuala Lumpur'
  );
INSERT INTO Job(
    jobId,
    alumniId,
    title,
    description,
    salary,
    email,
    postedDateTime,
    imageId,
    company,
    location
  )
VALUES (
    'J-10',
    'AL-10',
    'Go Developer',
    "Bachelor's degree in IT or other similar field.
Experience with Go.
Knowledge of PCF (Pivotal Cloud Foundry)
Experience with Java will be a plus",
    '3400',
    'rohana@um.edu.my',
    '2021-04-05T15:53:53+00:00',
    'J-10',
    'Top Glove',
    'Shah Alam'
  );
INSERT INTO Events(
    eventId,
    adminId,
    title,
    dateTime,
    description,
    imageId,
    location
  )
VALUES (
    'E-1',
    'AD-1',
    'Constraint programming Workshop',
    '2021-04-04T15:53:53+00:00',
    'Constraint programming (CP) is a paradigm for solving combinatorial problems that draws on a wide range of techniques from artificial intelligence, computer science, and operations research. In constraint programming, users declaratively state the constraints on the feasible solutions for a set of decision variables.

Through this workshop, you will learn basic search, variable and value choices, and how propagation and search can be combined in a seamless and efficient manner.',
    'E-1',
    'FSKTM, MM2'
  );
INSERT INTO Events(
    eventId,
    adminId,
    title,
    dateTime,
    description,
    imageId,
    location
  )
VALUES (
    'E-2',
    'AD-1',
    'Database Admin Career',
    '2021-04-03T15:53:53+00:00',
    "Database administrators (DBAs) work with technology, using specialized types of software to store and organize a company's data. This could include a variety of information, from confidential financial numbers, to payroll data, to customer shipping records.

Database Admin Career will tell you the job scope as a Database Administrator in details!",
    'E-2',
    'FSKTM, MM3'
  );
INSERT INTO Events(
    eventId,
    adminId,
    title,
    dateTime,
    description,
    imageId,
    location
  )
VALUES (
    'E-3',
    'AD-2',
    'Into the world of Cognitive Science',
    '2021-04-02T15:53:53+00:00',
    'Cognitive science is the interdisciplinary, scientific study of the mind and its processes. It examines the nature, the tasks, and the functions of cognition (in a broad sense).

It will be very fun to study intelligence and behavior with a focus on how nervous systems represent, process, and transform information.',
    'E-3',
    'FSKTM, MM4'
  );
INSERT INTO Events(
    eventId,
    adminId,
    title,
    dateTime,
    description,
    imageId,
    location
  )
VALUES (
    'E-4',
    'AD-3',
    'Boom Boom Bootstrap',
    '2021-04-01T15:53:53+00:00',
    "Quizzes & Projects and Exclusive Content for you! Practice and discover more Bootstrap function in our workshop! Enroll Today! It's Never Too Late to Learn a New Skill! ",
    'E-4',
    'FSKTM, MM5'
  );
INSERT INTO Events(
    eventId,
    adminId,
    title,
    dateTime,
    description,
    imageId,
    location
  )
VALUES (
    'E-5',
    'AD-4',
    'React to React',
    '2021-03-09T15:53:53+00:00',
    'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.

Wait no more and join React to React now!!!',
    'E-5',
    'FSKTM, MM6'
  );
INSERT INTO Events(
    eventId,
    adminId,
    title,
    dateTime,
    description,
    imageId,
    location
  )
VALUES (
    'E-6',
    'AD-4',
    'Machine Learning Workshop',
    '2021-03-08T15:53:53+00:00',
    'Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.

-- We are sure that you will gain a lot by joining our workshop!',
    'E-6',
    'FSKTM, MM7'
  );
INSERT INTO Alumni_Event(
    alumniId,
    eventId,
    viewedByAlumni,
    dateTime,
    notificationClosedByAlumni
  )
VALUES (
    'AL-1',
    'E-1',
    1,
    '2021-04-14T13:53:53+00:00',
    0
  );
INSERT INTO Alumni_Event(
    alumniId,
    eventId,
    viewedByAlumni,
    dateTime,
    notificationClosedByAlumni
  )
VALUES (
    'AL-1',
    'E-2',
    1,
    '2021-04-15T15:00:53+00:00',
    0
  );
INSERT INTO Alumni_Event(
    alumniId,
    eventId,
    viewedByAlumni,
    dateTime,
    notificationClosedByAlumni
  )
VALUES (
    'AL-1',
    'E-3',
    0,
    '2021-04-16T15:53:13+00:00',
    0
  );
INSERT INTO Alumni_Event(
    alumniId,
    eventId,
    viewedByAlumni,
    dateTime,
    notificationClosedByAlumni
  )
VALUES (
    'AL-1',
    'E-4',
    0,
    '2021-04-24T15:53:53+00:00',
    0
  );
INSERT INTO Alumni_Event(
    alumniId,
    eventId,
    viewedByAlumni,
    dateTime,
    notificationClosedByAlumni
  )
VALUES (
    'AL-2',
    'E-5',
    0,
    '2021-04-24T16:49:53+00:00',
    1
  );
INSERT INTO Alumni_Event(
    alumniId,
    eventId,
    viewedByAlumni,
    dateTime,
    notificationClosedByAlumni
  )
VALUES (
    'AL-1',
    'E-6',
    0,
    '2021-04-24T16:53:53+00:00',
    1
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-1',
    'AD-1',
    'tey@gmail.com',
    '12345',
    '690110-10-1251',
    'male',
    'Tey Kok Soon',
    'Artificial Intelligence',
    '2003',
    'AL-1',
    1,
    'Tey is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-2',
    'AD-2',
    'ang@gmail.com',
    'CR4Z!f$@jJaK',
    '730110-10-1253',
    'male',
    'Ang Tan Fong',
    'Artificial Intelligence',
    '2006',
    'AL-2',
    1,
    'Ang is currently working at Sony, Hokkaido in Japan, building and expanding systems as a full stack lead developer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-3',
    'AD-3',
    'lan@gmail.com',
    'sVwRUK5`vnM~[sU',
    '800110-10-1133',
    'male',
    'Lan Li Hong',
    'Artificial Intelligence',
    '2015',
    'AL-3',
    1,
    'Lan Li Hong is currently working at HCL Technologies Malaysia Sdn. Bhd. as a Data Scientist'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-4',
    'AD-4',
    'behjiaong@gmail.com',
    'VsVP34vyaCF',
    '800110-10-1355',
    'male',
    'Beh Jia Ong',
    'Artificial Intelligence',
    '2018',
    'AL-4',
    1,
    'Beh Jia Ong is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a Machine Learning Engineer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-5',
    'AD-5',
    'keat@gmail.com',
    'b6NQLgt',
    '800110-10-1255',
    'male',
    'Ong Huat Keat',
    'Software Engineering',
    '2003',
    'AL-5',
    1,
    'Ong Huat Keat is currently working atNimble AppGenie as a Applications developer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-6',
    '',
    'rachel@gmail.com',
    '3Vq8PcwNks5Ng',
    '800110-10-1256',
    'female',
    'Rachel Lee Yin',
    'Software Engineering',
    '2008',
    'AL-6',
    1,
    'Rachel Lee Yin is currently working at EDUSPEC Holdings BERHAD as a full stack lead developer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-7',
    '',
    'tan@gmail.com',
    '/[x62r6akK!TL',
    '810110-10-1258',
    'female',
    'Tan Yan Win',
    'Software Engineering',
    '2017',
    'AL-7',
    0,
    'Tan Yan Win is currently working at Apple Incorporated (AAPL) as a full stack lead developer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-8',
    '',
    'limxt@gmail.com',
    'SaH$?6K^;zD',
    '820110-10-1714',
    'female',
    'Lim Xin Tong',
    'Software Engineering',
    '2019',
    'AL-8',
    0,
    'Lim Xin Tong is currently working at GoodCore Software as a Cyber security analyst.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-9',
    '',
    'alisa21@gmail.com',
    'p_A3/eh!eG@',
    '880110-10-1100',
    'female',
    'Alisa Mok Lian',
    'Multimedia',
    '2016',
    'AL-9',
    0,
    'Alisa Mok Lian is currently working at Datasonic Group Berhad as a multimedia designer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-10',
    '',
    'rohana@um.edu.my',
    ').2VKRk[v^?fwsQEFb',
    '920126-10-1210',
    'female',
    'Rohana binti Jani',
    'Multimedia',
    '2019',
    'AL-10',
    0,
    'Rohana binti Jani is currently working at ELSOFT Research Berhad as graphic designer.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-11',
    '',
    'juliana@gmail.com',
    'VULhL,]D8L',
    '930109-10-1260',
    'female',
    'Juliana binti Othman',
    'Information System',
    '2008',
    'AL-11',
    0,
    'Juliana binti Othman is currently working at Samsung electronics as a Information Systems Manager.'
  );
INSERT INTO Alumni(
    alumniId,
    approvedBy,
    email,
    password,
    icNumber,
    gender,
    name,
    department,
    graduated,
    imageId,
    isEmailPublic,
    biography
  )
VALUES (
    'AL-12',
    '',
    'behyunlian@gmail.com',
    '#<3{\mJ$65',
    '930210-10-1262',
    'female',
    'Beh Yun Lian',
    'Information System',
    '2015',
    'AL-12',
    0,
    'Beh Yun Lian is currently working at Nielson as a Computer Systems Analyst'
  );
ALTER TABLE Job
ADD FOREIGN KEY (alumniId) REFERENCES alumni(alumniId);
ALTER TABLE Alumni_Event
ADD FOREIGN KEY (alumniId) REFERENCES alumni(alumniId),
  ADD FOREIGN KEY (eventId) REFERENCES events(eventId);
ALTER TABLE Events
ADD FOREIGN KEY (adminId) REFERENCES admin(adminId);
