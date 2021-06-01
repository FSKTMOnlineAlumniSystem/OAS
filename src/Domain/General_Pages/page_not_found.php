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
  <title><?= $GLOBALS['title']; ?></title>
  <style>
    @keyframes example {
      from {
        transform: translateX(0px);
      }

      to {
        transform: translateX(-10px);
      }
    }

    .btn-animation {
      animation-name: example;
      animation-duration: 1s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
  </style>
</head>

<div class="row m-0 p-0 justify-content-center">
  <div class="col-md-4 pt-3 text-center">
    <img class="card-img-150 mt-5 mb-3" src="/Assets/imgs/404.svg" alt="404 Not Found">
    <a href="/home" class="btn btn-primary btn-animation px-3" type="button"><i class="fas fa-angle-left"></i> Back to home</a>
  </div>
</div>

</html>