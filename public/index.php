<?php
include '../config/config.php';
session_start();

if (preg_match('/^(\/?|\/home\/?)$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/Event/EventPage.php';
    
// } elseif (preg_match('/^\/event(\/[^\s\/]+)+\/?$/i', $_SERVER['REQUEST_URI'])) {
} elseif (preg_match('/^\/event\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Event/EventPage.php';

}elseif (preg_match('/^\/myprofile\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/MyProfilePage.php';
}
elseif (preg_match('/^\/myprofile\/edit\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/EditMyProfilePage.php';
}
 elseif (preg_match('/^\/api(\/[^\s\/]+)+\/?$/i', $_SERVER['REQUEST_URI'])) {
    include '../src/api/handler.php';

} else {
    $GLOBALS['title'] = TITLE_NOT_FOUND;
    include '../src/Domain/General_Pages/page_not_found.php';
}
