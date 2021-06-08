<?php
include '../config/config.php';
session_start();

//VIEW
if (preg_match('/^\/home/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/HomePage/HomePage.php';

    // } elseif (preg_match('/^\/event(\/[^\s\/]+)+\/?$/i', $_SERVER['REQUEST_URI'])) {
} 
elseif (preg_match('/^\/event\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Event/EventPage.php';
} elseif (preg_match('/^\/job\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Job/JobPage.php';
} elseif (preg_match('/^\/jobdetails\/?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Job/JobDetailsPage.php';
} elseif (preg_match('/^\/myjob\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Job/MyJobPage.php';
} elseif (preg_match('/^\/myjobdetails\/?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Job/MyJobDetailsPage.php';
} elseif (preg_match('/^\/addjob\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Job/AddJobPage.php';

//admin-event
}elseif (preg_match('/^\/adminEvent\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-EventPage.php';

}elseif (preg_match('/^\/adminUpdateEvent\/?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-EventPageUpdate.php';

}elseif (preg_match('/^\/adminCreateEvent\/?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-EventPageCreate.php';

}elseif (preg_match('/^\/inviteAlumni\/?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-InviteAlumniPage.php';

}elseif (preg_match('/^\/deleteEvent\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-deleteEvent.php';

}elseif (preg_match('/^\/inviteFunction\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/Admin-InviteFunction.php';

    
}elseif (preg_match('/^\/try\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Admin-Event/admin-try.php';
} 
elseif (preg_match('/^\/eventdetails\?eventId=?/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_EVENTS;
    include '../src/Domain/Event/EventDetailsPage.php';
}

//MyProfile
elseif (preg_match('/^\/myprofile\/edit/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/EditMyProfilePage.php';
} 
elseif (preg_match('/^\/myprofile/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/MyProfilePage.php';
}
//Admin-MyProfile
elseif (preg_match('/^\/adminprofile\/edit/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/Admin-MyProfile/Admin-EditMyProfilePage.php';
} 
elseif (preg_match('/^\/adminprofile/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/Admin-MyProfile/Admin-MyProfilePage.php';
}






//API
//MyProfile
elseif (preg_match('/^\/api\/myprofile\/edit\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/EditMyProfileController.php';
}
elseif (preg_match('/^\/api\/myprofile\/changepassword\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/ChangePasswordController.php';
}
elseif (preg_match('/^\/api\/myprofile\/changeprivacy/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/ChangePrivacyController.php';
}
elseif (preg_match('/^\/api\/myprofile\/delete\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/MyProfile/DeleteAccountController.php';
}

//Admin-MyProfile
elseif (preg_match('/^\/api\/adminprofile\/edit\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/Admin-MyProfile/Admin-EditMyProfileController.php';
}
elseif (preg_match('/^\/api\/adminprofile\/changepassword\/?$/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_MY_PROFILE;
    include '../src/Domain/Admin-MyProfile/AdminChangePasswordController.php';
}

//Header
elseif (preg_match('/^\/api\/alumni-event\/?$/i', $_SERVER['REQUEST_URI'])) {
    include '../src/Domain/Event/AlumniEventController.php';
}

//ERROR URL NOT FOUND
else {
    $GLOBALS['title'] = TITLE_NOT_FOUND;
    include '../src/Domain/General_Pages/page_not_found.php';
}
