<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("localhost", "root", "");

// Check connection
if ($link === false) {
  die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Print host information
echo "Connect Successfully. Host info: " . mysqli_get_host_info($link);
// echo setInterval(function(){location.reload(true);}, 10000);
?>
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
  <link rel="stylesheet" type="text/css" href="../../css/Alumni/index.css" />
  <link rel="stylesheet" type="text/css" href="../../css/Alumni/SearchBar.css" />
  <link rel="stylesheet" type="text/css" href="../../css/Alumni/EventPage.css" />

  <script>
    // setInterval(function() {
    //   location.reload(true);
    // }, 10000);
  </script>
  <title>Event - Online Alumni System</title>
</head>

<body>

  <div class="container my-5" id="main-body">
    <h1><b>Event</b></h1>
    <hr />
    <div id="event-page-section">
      <h2 id="your-upcoming-event-section-title">Your Upcoming Events</h2>
      <br />
      <div class="row" id="your-upcoming-event-section"></div>
      <br />

      <h2 id="upcoming-event-section-title">Other Upcoming Events</h2>
      <br />
      <div class="row" id="upcoming-event-section"></div>
    </div>
  </div>
  </div>
  <!-- general js files -->
  <script type="text/javascript" src="/src/js/utility.js"></script>
  <script type="module" src="/src/js/addHeader.js"></script>
  <script type="text/javascript" src="/src/js/addNavFooter.js"></script>
  <script type="text/javascript" src="/src/js/addSearchBar.js"></script>
  <script type="module" src="/src/js/Alumni/searchAlgo.js"></script>
  <!-- custom js files -->
  <script type="module" src="/src/js/Alumni/EventPage.js"></script>
  <!-- bootstrap javascript files -->
  <script src="/libs/bootstrap/js/bootstrap.bundle.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
</body>

</html>