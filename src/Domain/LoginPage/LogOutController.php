<?php 
// header('location: /login', true, 302);
// die();
// session_start();
session_destroy();
$arr = array("Message" => "Successfully destroy the session");
echo json_encode($arr);