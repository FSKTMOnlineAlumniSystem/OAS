<?php
include '../config/config.php';
session_start();

//Login
if (preg_match('/^\/admin-login\/?/i', $_SERVER['REQUEST_URI'])) {
    if (isset($_SESSION['admin'])) {
        header('Location: /admin');
        exit();
    }
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/Admin-LoginPage/Admin-LoginPage.php';
} elseif (preg_match('/^\/login\/?/i', $_SERVER['REQUEST_URI'])) {
    // comment below lines to test run login page
    if (isset($_SESSION['alumni'])) {
        header('Location: /home');
        exit();
    }
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/LoginPage/LoginPage.php';
}
//Login (API)
elseif (preg_match('/^\/api\/signin/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/LoginPage/SignInController.php';
} elseif (preg_match('/^\/api\/signup/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/LoginPage/SignUpController.php';
} elseif (preg_match('/^\/api\/forgot/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/LoginPage/forgotPasswordController.php';
}

//Admin-Login (API)
elseif (preg_match('/^\/api\/adminsignin/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/Admin-LoginPage/SignInAdminController.php';
} elseif (preg_match('/^\/api\/adminforgot/i', $_SERVER['REQUEST_URI'])) {
    $GLOBALS['title'] = TITLE_OAS;
    include '../src/Domain/Admin-LoginPage/ForgotPasswordAdminController.php';
}

// Logout (API)
elseif (preg_match('/^\/api\/log-out\/?$/i', $_SERVER['REQUEST_URI'])) {
    include '../src/Domain/LoginPage/LogOutController.php';
    exit(); // prevent further script from running
}

//ALUMNI IS SIGNED IN 
else if (isset($_SESSION['alumni'])) {
    //Home
    if (preg_match('/^\/home/i', $_SERVER['REQUEST_URI']) || preg_match('/^\/$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_OAS;
        include '../src/Domain/HomePage/HomePage.php';
    }

    //MyProfile (VIEW)
    elseif (preg_match('/^\/myprofile\/edit/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/MyProfile/EditMyProfilePage.php';
    } elseif (preg_match('/^\/myprofile/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/MyProfile/MyProfilePage.php';
    }
    //MyProfile (API)
    elseif (preg_match('/^\/api\/myprofile\/edit\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/MyProfile/EditMyProfileController.php';
    } elseif (preg_match('/^\/api\/myprofile\/changepassword\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/MyProfile/ChangePasswordController.php';
    } elseif (preg_match('/^\/api\/myprofile\/changeprivacy/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/MyProfile/ChangePrivacyController.php';
    } elseif (preg_match('/^\/api\/myprofile\/delete\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/MyProfile/DeleteAccountController.php';
    }

    //Event (VIEW)
    elseif (preg_match('/^\/eventdetails\?eventId=?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Event/EventDetailsPage.php';
    } elseif (preg_match('/^\/event\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Event/EventPage.php';
    } elseif (preg_match('/^\/my-event\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_EVENTS;
        include '../src/Domain/Event/EventPage.php';
    }

    //Job (VIEW)
    elseif (preg_match('/^\/job\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_JOB;
        include '../src/Domain/Job/JobPage.php';
    } elseif (preg_match('/^\/jobdetails\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_JOB;
        include '../src/Domain/Job/JobDetailsPage.php';
    } elseif (preg_match('/^\/myjob\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MYJOB;
        include '../src/Domain/Job/MyJobPage.php';
    } elseif (preg_match('/^\/myjobdetails\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MYJOB;
        include '../src/Domain/Job/MyJobDetailsPage.php';
    } elseif (preg_match('/^\/addjob\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_ADDJOB;
        include '../src/Domain/Job/AddJobPage.php';
    } elseif (preg_match('/^\/editmyjob\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EDITJOB;
        include '../src/Domain/Job/EditMyJobPage.php';
    }
    //Job (API)
    elseif (preg_match('/^\/deleteJob\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MYJOB;
        include '../src/Domain/Job/deleteJobController.php';
    } elseif (preg_match('/^\/searchJob\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MYJOB;
        include '../src/Domain/Job/searchController.php';
    } elseif (preg_match('/^\/searchAllJob\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_JOB;
        include '../src/Domain/Job/searchJobController.php';
    } else {
        $GLOBALS['title'] = TITLE_NOT_FOUND;
        http_response_code(404);
        include '../src/utilities/includeWithVariable.php';
        includeWithVariables('../src/templates/header.php', array(
            'index' => '/css/Alumni/index.css'
        ));
        include '../src/templates/nav.php';
        include '../src/Domain/General_Pages/page_not_found.php';
        include_once '../src/templates/footer.php';
        include_once '../src/templates/GeneralScripts.php';
    }
} 
// ADMIN IS SIGNED IN
else if (isset($_SESSION['admin'])) {
    //Admin-Home
    if (preg_match('/^\/admin$/i', $_SERVER['REQUEST_URI']) || preg_match('/^\/$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/Admin-Home/Admin-HomePage.php';
    }
    //Admin-MyProfile (VIEW)
    elseif (preg_match('/^\/adminprofile\/edit/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/Admin-MyProfile/Admin-EditMyProfilePage.php';
    } elseif (preg_match('/^\/adminprofile/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/Admin-MyProfile/Admin-MyProfilePage.php';
    }
    //Admin-MyProfile (API)
    elseif (preg_match('/^\/api\/adminprofile\/edit\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/Admin-MyProfile/Admin-EditMyProfileController.php';
    } elseif (preg_match('/^\/api\/adminprofile\/changepassword\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_MY_PROFILE;
        include '../src/Domain/Admin-MyProfile/AdminChangePasswordController.php';
    } elseif (preg_match('/^\/api\/event\?/i', $_SERVER['REQUEST_URI'])) {
        include '../src/Domain/Event/EventController.php';
    } elseif (preg_match('/^\/api\/alumni-event\/?$/i', $_SERVER['REQUEST_URI'])) {
        include '../src/Domain/Event/AlumniEventController.php';
    }

    // Admin Manage Alumni
    elseif (preg_match('/^\/admin\/alumnilist\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageAlumni/Admin-AlumniListPage.php';
    } elseif (preg_match('/^\/admin\/deleteAlumni\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageAlumni/Admin-DeleteAlumniController.php';
    } elseif (preg_match('/^\/admin\/approveAlumni\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageAlumni/Admin-ApproveAlumniController.php';
    } elseif (preg_match('/^\/admin\/deleteMultipleAlumni\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageAlumni/Admin-deleteMultipleAlumni.php';
    } elseif (preg_match('/^\/admin\/editalumni\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageAlumni/Admin-EditAlumniProfilePage.php';
    } elseif (preg_match('/^\/admin\/searchAlumniName\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageAlumni/Admin-FilterController.php';
    }
    //Admin Manage Alumni
    elseif (preg_match('/^\/alumni\/profile/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_ALUMNI_PROFILE;
        include '../src/Domain/Alumni/AlumniProfilePage.php';
    } elseif (preg_match('/^\/alumni/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_ALUMNI;
        include '../src/Domain/Alumni/AlumniPage.php';
    }
    //Admin-ManageEvent
    elseif (preg_match('/^\/admin\/event\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-EventPage.php';
    } elseif (preg_match('/^\/admin\/update\/event\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-UpdateEventPage.php';
    } elseif (preg_match('/^\/admin\/create\/event\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-CreateEventPage.php';
    } elseif (preg_match('/^\/admin\/invite\/alumni\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-InviteAlumniPage.php';
    } elseif (preg_match('/^\/admin\/delete\/event\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-DeleteEventController.php';
    } elseif (preg_match('/^\/admin\/invite\/function\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-InviteAlumniController.php';
    } elseif (preg_match('/^\/admin\/search\/event\/?$/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-EventSearchController.php';
    } elseif (preg_match('/^\/admin\/search\/invite\/alumni\/?/i', $_SERVER['REQUEST_URI'])) {
        $GLOBALS['title'] = TITLE_EVENTS;
        include '../src/Domain/Admin-ManageEvent/Admin-inviteAlumniSearchController.php';
    } else {
        $GLOBALS['title'] = TITLE_NOT_FOUND;
        http_response_code(404);
        include '../src/utilities/includeWithVariable.php';
        includeWithVariables('../src/templates/header.php', array(
            'index' => '/css/Alumni/index.css'
        ));
        include '../src/Domain/General_Pages/admin_page_not_found.php';
    }
}
// HANDLE EMPTY SESSION (REDIRECT)
elseif (strpos($_SERVER['REQUEST_URI'], 'admin') !== false) {
    //contain "admin" in url 
    header('Location:/admin-login');
    exit;
} 
else {
    header('Location: /login');
    exit;
}
