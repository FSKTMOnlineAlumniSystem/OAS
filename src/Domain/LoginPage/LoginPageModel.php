<?php

// include '../../../config/config.php';
// include '../Database.php';


$servername = "localhost";
$dbname = "OAS";
$dbpsw = "";
$dbusername = "root";

$conn = mysqli_connect($servername,$dbusername, $dbpsw, $dbname);

if(!$conn){
    die("Connection failed: ".mysqli_connect_error());
}

