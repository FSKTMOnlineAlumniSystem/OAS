<?php

date_default_timezone_set('Asia/Kuala_Lumpur');

// Comment out for development to enable error display
// ini_set('log_errors','1');


// comment out these for production
// ini_set('error_reporting', E_ALL );
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
// Change according to your needs, RCMS is the name of the database created in setup.sql
define('DATABASE_NAME', 'OAS');
define('DATABASE_USERNAME', 'root');
define('DATABASE_PASSWORD', '');

// connect to MySQL
// $mysqli = new mysqli('localhost', DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME); 
// if ($mysqli->connect_error) {
// 	die("Connection failed: " . $mysqli->connect_error);
// }
// echo "Database connected successfully <br>";
// The connection will be closed automatically when the script ends.

// Use your own email with password if this is not working. 
define('SMTP_SERVER_HOST', 'smtp.gmail.com');
define('SMTP_SERVER_PORT', 587);
define('EMAIL_ADDRESS', 'xxx@gmail.com');
define('EMAIL_PASSWORD', 'xxx');

// User private uploads to be stored outside web root
define('EVENT_UPLOAD_PATH', '../uploads/events/');

if (!is_dir(EVENT_UPLOAD_PATH)) {
    mkdir(EVENT_UPLOAD_PATH, 0754, true);
}

// define('CAROUSEL_IMAGES_PATH', realpath($_SERVER['DOCUMENT_ROOT'] . '/assets/img/carousel/'));

##################################################### APP CONSTANTS ####################################################

// some examples
define('STATUS_PENDING', 0);
define('STATUS_COMPLETED', 1);
define('STATUS_IN_PROGRESS', 2);
define('STATUS_SUBMITTED', 0);
define('STATUS_APPROVED', 1);
define('STATUS_REJECTED', 2);


// add our app constants below
define('TITLE_OAS', 'Online Alumni System');
define('TITLE_EVENTS', 'Events - Online Alumni System');
define('TITLE_MY_EVENTS', 'My Events - Online Alumni System');
define('TITLE_JOB', 'Job - Alumni Online System');
define('TITLE_MYJOB', 'My Job - Alumni Online System');
define('TITLE_EDITJOB', 'Edit Job - Alumni Online System');
define('TITLE_ADDJOB', 'Add Job - Alumni Online System');
define('TITLE_MY_PROFILE', 'My Profile - Online Alumni System');
define('TITLE_ALUMNI_PROFILE', 'Alumni Profile - Online Alumni System');
define('TITLE_NOT_FOUND', 'Page Not Found');
define('IMG_PATH','/public/Assets/imgs/');

define('PUBLIC_IMG_PATH',"../public/Assets/imgs/");


?>