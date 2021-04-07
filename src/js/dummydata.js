const dummyResponse = {
    "Alumni": [
        {
            "alumniId": "AL-1",
            "approvedBy": "AD-1",
            "email": "teh@gmail.com",
            "password": "1234",
            "icNumber": "690110-10-1251",
            "gender": "male",
            "name": "Teh Kok Soon",
            "department": "Artificial Intelligence",
            "graduated": "1985",
            "imageId": "img-001",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-2",
            "approvedBy": "AD-2",
            "email": "ang@gmail.com",
            "password": "1234",
            "icNumber": "730110-10-1253",
            "gender": "male",
            "name": "Ang Tan Foo",
            "department": "Artificial Intelligence",
            "graduated": "1989",
            "imageId": "img-002",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-3",
            "approvedBy": "AD-3",
            "email": "lan@gmail.com",
            "password": "1234",
            "icNumber": "800110-10-1133",
            "gender": "male",
            "name": "Lan Li Hong",
            "department": "Artificial Intelligence",
            "graduated": "2000",
            "imageId": "img-003",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-4",
            "approvedBy": "AD-4",
            "email": "behjiaong@gmail.com",
            "password": "1234",
            "icNumber": "800110-10-1355",
            "gender": "male",
            "name": "Beh Jia Ong",
            "department": "Artificial Intelligence",
            "graduated": "2000",
            "imageId": "img-004",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-5",
            "approvedBy": "AD-5",
            "email": "keat@gmail.com",
            "password": "1234",
            "icNumber": "800110-10-1255",
            "gender": "male",
            "name": "Ong Huat Keat",
            "department": "Software Engineering",
            "graduated": "2000",
            "imageId": "img-005",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-6",
            "approvedBy": "AD-6",
            "email": "ang@gmail.com",
            "password": "1234",
            "icNumber": "800110-10-1256",
            "gender": "female",
            "name": "Rachel Lee Yin",
            "department": "Software Engineering",
            "graduated": "2000",
            "imageId": "img-006",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-7",
            "approvedBy": "AD-7",
            "email": "tan@gmail.com",
            "password": "1234",
            "icNumber": "810110-10-1258",
            "gender": "female",
            "name": "Tan Yan Win",
            "department": "Software Engineering",
            "graduated": "2000",
            "imageId": "img-007",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-8",
            "approvedBy": "AD-8",
            "email": "limxt@gmail.com",
            "password": "1234",
            "icNumber": "820110-10-1714",
            "gender": "female",
            "name": "Lim Xin Tong",
            "department": "Software Engineering",
            "graduated": "2000",
            "imageId": "img-008",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-9",
            "approvedBy": "AD-9",
            "email": "alisa21@gmail.com",
            "password": "1234",
            "icNumber": "880110-10-1100",
            "gender": "female",
            "name": "Alisa Mok Lian",
            "department": "Data Science",
            "graduated": "2010",
            "imageId": "img-009",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-10",
            "approvedBy": "AD-10",
            "email": "rohana@um.edu.my",
            "password": "1234",
            "icNumber": "920126-10-1210",
            "gender": "female",
            "name": "Rohana binti Jani",
            "department": "Data Science",
            "graduated": "2014",
            "imageId": "img-0010",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-11",
            "approvedBy": "AD-11",
            "email": "juliana@gmail.com",
            "password": "1234",
            "icNumber": "930109-10-1260",
            "gender": "female",
            "name": "Juliana binti Othman",
            "department": "Information System",
            "graduated": "2015",
            "imageId": "img-0011",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        },
        {
            "alumniId": "AL-12",
            "approvedBy": "AD-12",
            "email": "behyunlian@gmail.com",
            "password": "1234",
            "icNumber": "930210-10-1262",
            "gender": "female",
            "name": "Beh Yun Lian",
            "department": "Information System",
            "graduated": "2015",
            "imageId": "img-0012",
            "biography": "XXX is currently working at HTM Niseko, Hokkaido in Japan, building and expanding systems as a full stack lead developer. ."
        }
    ],
    "Event": [
        {
            "eventId": "E-1",
            "adminId": "AD-1",
            "title": "CP Workshop",
            "dateTime": "2021-04-04T15:53:53+00:00",
            "description": "Learn more about CP",
            "imageId": "img-0013",
            "location": "FSKTM, MM2"
        },
        {
            "eventId": "E-2",
            "adminId": "AD-1",
            "title": "Database Admin Career",
            "dateTime": "2021-04-03T15:53:53+00:00",
            "description": "Learn more about DB",
            "imageId": "img-0014",
            "location": "FSKTM, MM3"
        },
        {
            "eventId": "E-3",
            "adminId": "AD-2",
            "title": "Ashrae Run",
            "dateTime": "2021-04-02T15:53:53+00:00",
            "description": "Learn more about Running from bug",
            "imageId": "img-0015",
            "location": "FSKTM, MM4"
        },
        {
            "eventId": "E-4",
            "adminId": "AD-3",
            "title": "Boom Boom Bootstrap",
            "dateTime": "2021-04-01T15:53:53+00:00",
            "description": "Learn more about Bootstrap",
            "imageId": "img-0016",
            "location": "FSKTM, MM5"
        },
        {
            "eventId": "E-5",
            "adminId": "AD-4",
            "title": "React to React",
            "dateTime": "2021-03-09T15:53:53+00:00",
            "description": "Learn more about React",
            "imageId": "img-0017",
            "location": "FSKTM, MM6"
        },
        {
            "eventId": "E-6",
            "adminId": "AD-4",
            "title": "Macrohard workshop",
            "dateTime": "2021-03-08T15:53:53+00:00",
            "description": "Learn more about Macrohard",
            "imageId": "img-0018",
            "location": "FSKTM, MM7"
        }
    ],
    "Alumni_Event": [
        {
            "alumniId": "AL-1",
            "eventId": "E-1",
            "viewedByAlumni": "TRUE"
        },
        {
            "alumniId": "AL-1",
            "eventId": "E-2",
            "viewedByAlumni": "TRUE"
        },
        {
            "alumniId": "AL-1",
            "eventId": "E-3",
            "viewedByAlumni": "TRUE"
        },
        {
            "alumniId": "AL-1",
            "eventId": "E-4",
            "viewedByAlumni": "FALSE"
        },
        {
            "alumniId": "AL-1",
            "eventId": "E-5",
            "viewedByAlumni": "FALSE"
        },
        {
            "alumniId": "AL-1",
            "eventId": "E-6",
            "viewedByAlumni": "FALSE"
        }
    ],
    "Job": [
        {
            "jobId": "J-1",
            "alumniId": "AL-1",
            "title": "DB admin",
            "description": "must know DB",
            "salary": "3000",
            "email": "teh@gmail.com",
            "postedDate": "2021-04-04T15:53:53+00:00"
        },
        {
            "jobId": "J-2",
            "alumniId": "AL-2",
            "title": "Frond-end dev",
            "description": "must know FE",
            "salary": "2000",
            "email": "ang@gmail.com",
            "postedDate": "2021-04-04T15:53:53+00:00"
        },
        {
            "jobId": "J-3",
            "alumniId": "AL-3",
            "title": "Back-end dev",
            "description": "must know BE",
            "salary": "3000",
            "email": "lan@gmail.com",
            "postedDate": "2021-04-04T15:53:53+00:00"
        },
        {
            "jobId": "J-4",
            "alumniId": "AL-4",
            "title": "Flutter dev",
            "description": "must know Flutter",
            "salary": "2500",
            "email": "behjiaong@gmail.com",
            "postedDate": "2021-04-04T15:53:53+00:00"
        },
        {
            "jobId": "J-5",
            "alumniId": "AL-5",
            "title": "DB admin",
            "description": "must know DB",
            "salary": "4000",
            "email": "keat@gmail.com",
            "postedDate": "2021-04-04T15:53:53+00:00"
        },
        {
            "jobId": "J-6",
            "alumniId": "AL-6",
            "title": "Frond-end dev",
            "description": "must know FE",
            "salary": "3000",
            "email": "ang@gmail.com",
            "postedDate": "2021-04-05T15:53:53+00:00"
        },
        {
            "jobId": "J-7",
            "alumniId": "AL-7",
            "title": "Back-end dev",
            "description": "must know BE",
            "salary": "2000",
            "email": "tan@gmail.com",
            "postedDate": "2021-04-05T15:53:53+00:00"
        },
        {
            "jobId": "J-8",
            "alumniId": "AL-8",
            "title": "Flutter dev",
            "description": "must know Flutter",
            "salary": "3000",
            "email": "limxt@gmail.com",
            "postedDate": "2021-04-05T15:53:53+00:00"
        },
        {
            "jobId": "J-9",
            "alumniId": "AL-9",
            "title": "Vue dev",
            "description": "must know Vue",
            "salary": "4000",
            "email": "alisa21@gmail.com",
            "postedDate": "2021-04-05T15:53:53+00:00"
        },
        {
            "jobId": "J-10",
            "alumniId": "AL-10",
            "title": "Go Dev",
            "description": "must know Go",
            "salary": "3400",
            "email": "rohana@um.edu.my",
            "postedDate": "2021-04-05T15:53:53+00:00"
        }
    ],
    "Admin": [
        {
            "adminId": "AD-1",
            "email": "a@gmail.com",
            "password": "1234",
            "name": "Siti"
        },
        {
            "adminId": "AD-2",
            "email": "b@gmail.com",
            "password": "1234",
            "name": "Zhaleha"
        },
        {
            "adminId": "AD-3",
            "email": "c@gmail.com",
            "password": "1234",
            "name": "Ang Loon Boo"
        },
        {
            "adminId": "AD-4",
            "email": "d@gmail.com",
            "password": "1234",
            "name": "Siva"
        },
        {
            "adminId": "AD-4",
            "email": "e@gmail.com",
            "password": "1234",
            "name": "Khai"
        }
    ]
};
export default dummyResponse;