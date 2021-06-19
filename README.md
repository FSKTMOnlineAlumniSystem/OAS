# FSKTM Online Alumni System
## User manual
### 1. Clone the repository
```
git clone https://github.com/FSKTMOnlineAlumniSystem/OAS.git
```
### 2. Set DocumentRoot and Directory to public directory in httpd.conf for XAMPP
```
DocumentRoot "C:/.../public"
<Directory "C:/.../public">
```
### 3. Change default max_allowed_packet in my.ini for mysql
```
max_allowed_packet=100M
```
### 4. Modify the Database Connection Details and System Email Address in config.php
```
define('DATABASE_USERNAME', 'ENTER YOUR DATABASE USERNAME');
define('DATABASE_PASSWORD', 'ENTER YOUR DATABASE PASSWORD');
define('DATABASE_PORT', 'ENTER YOUR DATABASE PORT NUMBER');
define('SYSTEM_EMAIL_USERNAME', 'ENTER YOUR SYSTEM EMAIL ADDRESS');
define('SYSTEM_EMAIL_PASSWORD', 'ENTER YOUR SYSTEM EMAIL PASSWORD');
```
### 5. Import database with dummy data using setup.sql via phpMyAdmin
### 6. Steps To Create Testing Account (*valid email is required for forgot password feature*)
#### ```ALUMNI:```
```
1. Sign up a new alumni account at '/login'
2. Check your email to verify your email (can change isVerified column to 1 in alumni table)
3. Approve alumni
  - Option 1: In alumni table column 'approvedBy', add any adminId from admin table (e.g. AD-1)
  - Option 2: Login as admin, approve the alumni in '/admin/alumnilist' page
4. login at '/login'
```
#### ```ADMIN:```
```
Option 1 : 
1. Edit email address of existing admin with adminId="AD-1", the login password is "12345"

Option 2 : 
1. Insert a new admin in admin table (imageId must be entered same as adminId)
2. go to '/admin-login' then click forgot password and type your valid email
3. check your email to get the new password
4. login at '/admin-login'
```


## Requirements :snowflake:
The system should provide the following functions: 

```Alumni: ```
* **Register** a new user account and user login to access the system 
* **Manage** user profile (view, update user details, delete a user account) 
* **View event** organised by the faculty. 
* **Add** a new job advertisement, can **update and delete** the job advertisement), **view** the list of advertisement posted by all the alumni 
* **Search alumni** and view the alumni profile 

```Faculty Administrator: ```
* **Manage Alumni account** (can view the list of alumni, update alumni information, approve a new alumni account and delete an account). 
* Create a new event to **invite alumni** to join, can **update and delete** the event.


## Tech stack
### Client/Frontend
*Language:* HTML5, CSS, Javascript  
*Framework:* Bootstrap
*Icon:* Font Awesome v5.10.0
### Server/Backend
*Language:* PHP  
### Database
*DBMS:* MYSQL

## Prerequisite
- APACHE server
- MySQL
- PHP

## File System
* **config** - store general constant variable and configuration
* **public** - store user accesible files
* **src** - store php source codes
* **src/templates** - store general view file like header, nav bar, footer, generalScript
* **src/utilities** - store general php function
* **src/Domain** - store Modal, View and Controller by feature

## Page & link
```Alumni```

**Login Page** 
```
/login
```
**Home Page** 
```
/home
```
**Alumni Page** 
```
/alumni
```
**Alumni Profile Page** 
```
/alumni/profile?id=${alumniId}
```
**My Profile Page** 
```
/myprofile
```
**Edit My Profile Page** 
```
/myprofile/edit
```
**Job Page** 
```
/job
```
**Job Details Page** 
```
/jobdetails?jobid=${jobid}
```
**My Job Page** 
```
/myjob
```
**Add Job Page** 
```
/addjob
```
**My Job Details Page** 
```
/myjobdetails?myjobid=${myjobid}
```
**Edit My Job Page** 
```
/editmyjob?myjobid=${myjobid}
```
**Event Page** 
```
/event
```
**My Event Page** 
```
/my-event
```
**Event Details Page** 
```
/eventdetails?eventId=${eventId}
```
```Admin```

**Login Page** 
```
/admin-login
```
**Home Page** 
```
/admin
```
**My Profile Page** 
```
/adminprofile
```
**Edit My Profile Page** 
```
/adminprofile/edit
```
**Alumni List Page** 
```
/admin/alumnilist
```
**Edit Alumni Page** 
```
/admin/editalumni
```
**EventPage** 
```
/admin/event
```
**UpdateEventPage** 
```
/admin/update/event?eventId='+eventArray[clickedAlumniIndex].eventId}
/admin/update/event?eventId=${eventArray[i].eventId}
```
**CreateEventPage** 
```
/admin/create/event
```
**InviteAlumniPage** 
```
/admin/invite/alumni?eventId=${eventArray[i].eventId}
```

## Links
### MySQL
[Windows FAQ](https://www.apachefriends.org/faq_windows.html)  
[From MariaDB to MySQL 1](https://ourcodeworld.com/articles/read/1215/how-to-use-mysql-5-7-instead-of-mariadb-in-xampp-for-windows)  
[From MariaDB to MySQL 2](https://stackoverflow.com/questions/39654428/how-can-i-change-mariadb-to-mysql-in-xampp)  
[Error: Access denied for user 'pma'@'localhost' (using password: NO)](https://stackoverflow.com/questions/46736319/phpmyadmin-error-mysqli-real-connect-hy000-1045-access-denied-for-user-p/57469097)  
[Why we should choose PDO over mysqli](https://stackoverflow.com/questions/13569/mysqli-or-pdo-what-are-the-pros-and-cons)  
[Solve mysql blocked port in Xampp](https://kinsta.com/knowledgebase/xampp-mysql-shutdown-unexpectedly/#what-the-xampp-error-mysql-shutdown-unexpectedly-is)

### User Access
[Ultimate Guide about .htaccess](https://www.whoishostingthis.com/resources/htaccess/)

### Client-Server Model
[Grab data from fetch api in php](https://stackoverflow.com/questions/33439030/how-to-grab-data-using-fetch-api-post-method-in-php)
[Return JSON to Front end from PHP](https://stackoverflow.com/questions/682260/returning-json-from-php-to-javascript)

### Git
[Stop updating file into repo](https://stackoverflow.com/questions/4348590/how-can-i-make-git-ignore-future-revisions-to-a-file)

### PHP Logging
[Guide](https://www.loggly.com/ultimate-guide/php-logging-basics/)
[Modurn Error Logging](https://netgen.io/blog/modern-error-handling-in-php)

## Acknowledgement
We would like to express our deepest appreciation to our surpervisor, Dr Chiam Yin Kia for providing invaluable guidance to complete this project successfully. Furthermore, we are also extremely grateful to have every members in this project who give full cooperation throughout this project. 

## Contributors
- [Ng Yong Ming](https://github.com/YongMing11)
- [Chooi He Lin](https://github.com/HeLinChooi)
- [Chong Wei Hao](https://github.com/CyberWorldHao)
- [Tan Yan Wen](https://github.com/yanwen-hb)
- [Nicole Lai Yiyin](https://github.com/nic-00)
- [Lim Xin Joe](https://github.com/Xinjoe)
- [Rachel Ong Xin Yee](https://github.com/rachelong1)
