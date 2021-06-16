<?php

date_default_timezone_set('Asia/Kuala_Lumpur');

// PHP code for logging error into a given file
// path of the log file where errors need to be logged
$log_file = "../src/Logger/errors.log";
  
// setting error logging to be active
// Comment out for development to enable error display
ini_set("log_errors", TRUE); 
  
// setting the logging file in php.ini
ini_set('error_log', $log_file);
  
// comment out these for production
ini_set('error_reporting', E_ALL );
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');

// Change according to your needs, RCMS is the name of the database created in setup.sql
define('DATABASE_NAME', 'OAS');
define('DATABASE_USERNAME', 'root');
define('DATABASE_PASSWORD', '');

function exception_handler($exception) {
    $error_message = "Uncaught exception: " . $exception->getMessage();
    error_log($error_message);
 }
 
 set_exception_handler('exception_handler');
// define('CAROUSEL_IMAGES_PATH', realpath($_SERVER['DOCUMENT_ROOT'] . '/assets/img/carousel/'));

##################################################### APP CONSTANTS ####################################################

// add our app constants below
define('TITLE_OAS', 'Online Alumni System');
define('TITLE_EVENTS', 'Events - Online Alumni System');
define('TITLE_MY_EVENTS', 'My Events - Online Alumni System');
define('TITLE_JOB', 'Job - Online Alumni System');
define('TITLE_MYJOB', 'My Job - Online Alumni System');
define('TITLE_EDITJOB', 'Edit Job - Online Alumni System');
define('TITLE_ADDJOB', 'Add Job - Online Alumni System');
define('TITLE_MY_PROFILE', 'My Profile - Online Alumni System');
define('TITLE_ALUMNI_PROFILE', 'Alumni Profile - Online Alumni System');
define('TITLE_ALUMNI', 'Alumni - Online Alumni System');
define('TITLE_ADMIN_EVENTS', 'Admin Event - Online Alumni System');
define('TITLE_ADMIN_CREATE_EVENTS', 'Admin Create Event - Online Alumni System');
define('TITLE_ADMIN_UPDATE_EVENTS', 'Admin Update Event - Online Alumni System');
define('TITLE_ADMIN_INVITE_ALUMNI', 'Admin Invite Alumni - Online Alumni System');
define('TITLE_NOT_FOUND', 'Page Not Found');


?>