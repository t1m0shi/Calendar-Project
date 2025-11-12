<?php

//1. Connect to local mysql server (xampp)
$username = "root";
$conn = new mysqli("localhost", $username, "", "course_calendar");
$conn->set_charset("utf8mb4");
//localhost/phpmyadmin