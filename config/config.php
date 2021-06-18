<?php

date_default_timezone_set('Asia/Kuala_Lumpur');

// PHP code for logging error into a given file
// comment out these for production
ini_set('error_reporting', E_ALL );
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');

// path of the log file where errors need to be logged
$log_file = "../src/Logger/errors.log";
  
// setting the logging file in php.ini
ini_set('error_log', $log_file);

// setting error logging to be active
// comment out for development to enable error display
ini_set("log_errors", TRUE); 
function exception_handler($exception) {
    $error_message = "Uncaught exception: " . $exception->getMessage();
    error_log($error_message);
    include_once '../src/templates/header.php';
    include_once '../src/Domain/General_Pages/server_error.php';
 }
 set_exception_handler('exception_handler');

// Change according to your needs, RCMS is the name of the database created in setup.sql
define('DATABASE_NAME', 'ENTER YOUR DATABASE NAME');
define('DATABASE_USERNAME', 'ENTER YOUR DATABASE USERNAME');
define('DATABASE_PASSWORD', 'ENTER YOUR DATABASE PASSWORD');
//SYSTEM_EMAIL_USERNAME & SYSTEM_EMAIL_PASSWORD will be used to send email to user
define('SYSTEM_EMAIL_USERNAME', 'ENTER YOUR SYSTEM EMAIL');
define('SYSTEM_EMAIL_PASSWORD', 'ENTER YOUR SYSTEM EMAIL PASSWORD');

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
define('TITLE_ADMIN_MANAGE_ALUMNI', 'Admin Manage Alumni - Online Alumni System');
define('TITLE_ADMIN_EDIT_ALUMNI_PROFILE', 'Admin Edit Alumni Profile - Online Alumni System');
define('TITLE_NOT_FOUND', 'Page Not Found');


?>