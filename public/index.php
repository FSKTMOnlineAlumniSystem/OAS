<?php
include '../config/config.php';
include '../src/utilities/core.php';
include '../src/models/Database.php';
session_start();


if (preg_match('/^(\/?|\/(home|activities)\/?)$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/modules/home/home.php';
    
} elseif (preg_match('/^\/api(\/[^\s\/]+)+\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/api/handler.php';

} elseif (preg_match('/^\/api(\/[^\s\/]+)+\/?$/i', $_SERVER['REQUEST_URI'])) {
    include '../src/api/handler.php';

} else {
    $GLOBALS['title'] = TITLE_NOT_FOUND;
    include '../src/modules/page-not-found.php';
}
