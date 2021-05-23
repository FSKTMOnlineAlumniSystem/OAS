# core
This is the main repo for the alumni system. So treat the repo carefully :kissing:  
Make sure you know how to revert changes made to reverse any destructive changes to the repo.   

## File System
* **config** - store general constant variable and configuration
* **public** - store user accesible files
* **src** - store php source codes
* **src/templates** - store general view file like header, footer, modal(later)
* **src/utilities** - store general php function
* **src/Domain** - store Modal, View and Controller by feature

## Links
### MySQL
[Windows FAQ](https://www.apachefriends.org/faq_windows.html)  
[From MariaDB to MySQL 1](https://ourcodeworld.com/articles/read/1215/how-to-use-mysql-5-7-instead-of-mariadb-in-xampp-for-windows)  
[From MariaDB to MySQL 2](https://stackoverflow.com/questions/39654428/how-can-i-change-mariadb-to-mysql-in-xampp)  
[Error: Access denied for user 'pma'@'localhost' (using password: NO)](https://stackoverflow.com/questions/46736319/phpmyadmin-error-mysqli-real-connect-hy000-1045-access-denied-for-user-p/57469097)  
[Why we should choose PDO over mysqli](https://stackoverflow.com/questions/13569/mysqli-or-pdo-what-are-the-pros-and-cons)  

### User Access
[We should store image in directory instead of as base64](https://makitweb.com/upload-and-store-an-image-in-the-database-with-php/)
[Ultimate Guide about .htaccess](https://www.whoishostingthis.com/resources/htaccess/)

## Requirements :snowflake:
The system should provide the following functions: 

Alumni: 
* **Register** a new user account and user login to access the system 
* **Manage** user profile (view, update user details, delete a user account) 
* **View event** organised by the faculty. 
* **Add** a new job advertisement, can **update and delete** the job advertisement), **view** the list of advertisement posted by all the alumni 
* **Search alumni** and view the alumni profile 

Faculty Administrator: 
* **Manage Alumni account** (can view the list of alumni, update alumni information, approve a new alumni account and delete an account). 
* Create a new event to **invite alumni** to join, can **update and delete** the event.