<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />
  <!-- font -->
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap" rel="stylesheet" />
  <!-- icon - fontawesome -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  <!-- custom css files -->
  <link rel="stylesheet" type="text/css" href="/css/Alumni/index.css" />
  <?php
  foreach ($variables as $value) {
    echo "<link rel='stylesheet' type='text/css' href='{$value}' />";
  }
  ?>
  <title><?= $GLOBALS['title']; ?></title>
</head>

<body>

  <?php
  // hardcode session to get name and image id for header
  $userArr = array("alumniId" => "AL-1", "name" => "Tey Kok Soon", "imageId" => "AD-1.png");
  $_SESSION['alumni'] = $userArr;
  ?>
  <header class="d-flex flex-row-reverse align-items-center header--gradient header--fixed-height p-2 font-weight-bold text-white">
    <div class="dropdown custom-bg--transparent">
      <button class="btn dropdown-toggle text-white" type="button" id="headerDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <?= $_SESSION['alumni']['name'] ?>
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="headerDropdownMenuButton">
        <a class="dropdown-item" href="#">Profile</a>
        <a class="dropdown-item" href="#">Logout</a>
      </div>
    </div>
    <div class="dropdown custom-bg--transparent">
      <button class="btn dropdown-toggle text-white" type="button" id="notificationDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="/Assets/imgs/<?= $_SESSION['alumni']['imageId'] ?>" alt="" class="header__img m-1">
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdownMenuButton">
        <?php
        // need to put as global to access it
        global $all_alumni_events;
        global $all_events;
        $filter_event = function ($eventId) {
          global $all_events;
          foreach ($all_events as $event) {
            if ($eventId === $event['eventId']) {
              return $event;
            }
          }
        };
        foreach ($all_alumni_events as $alumni_event) {
          if ($alumni_event['alumniId'] === $_SESSION['alumni']['alumniId']) {
            // get the required variable
            $timeStr = $alumni_event['dateTime'];
            $eventTitle = $filter_event($alumni_event['eventId'])['title'];
            $dotClass = $alumni_event['viewedByAlumni'];
        ?>
            <a class='dropdown-item' href='#'>
              <div class='py-2 d-flex container-fluid border-bottom item--hover-light-bg'>
                <div class="row">
                  <div class='col-2 d-flex justify-content-center align-items-center'>
                    <i class="far fa-calendar-alt fa-2x text-primary"></i>
                  </div>
                  <div class='col-8 flex-grow-1 px-0'>
                    You have been invited to join our event!!
                    <br/>
                    <strong>
                      <?= $eventTitle ?>
                    </strong>
                    <div class="text-primary"><?= $timeStr ?></div>
                  </div>
                  <div class="col-2 d-flex justify-content-center">
                    <div class='row flex-column'>
                      <i class="fa fa-times fa-2x p-1" aria-hidden="true"></i>
                      <i class="<?= $dotClass ?>" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </a>;
        <?php
          }
        }
        ?>
      </div>
    </div>
  </header>