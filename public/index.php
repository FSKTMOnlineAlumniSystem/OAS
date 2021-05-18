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

}elseif (preg_match('/^\/adminEvent\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-EventPage.php';

}elseif (preg_match('/^\/adminUpdateEvent\/?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-EventPageUpdate.php';

}elseif (preg_match('/^\/adminCreateEvent\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-EventPageCreate.php';

}elseif (preg_match('/^\/inviteAlumni\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-InviteAlumniPage.php';

} elseif (preg_match('/^\/api(\/[^\s\/]+)+\/?$/i', $_SERVER['REQUEST_URI'])) {
    include '../src/api/handler.php';

} else {
    echo $_SERVER['REQUEST_URI'];
    $GLOBALS['title'] = TITLE_NOT_FOUND;
    include '../src/Domain/General_Pages/page_not_found.php';
}
