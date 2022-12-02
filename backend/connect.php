<?php

# Author: Xingyun Zeng
# CST8285 Web Programming
# Assignment 2
# Backend PHP Script - set up connection to MySQL
# This is the PHP file for backend server. It receives JS post
# methods, then interacts with MySQL database, then send back
# responses to JS.
# requests and responses are in JSON format

$servername = "localhost";
$server_username = "root";
$server_password = "";
$database = "warehouse";

$conn = mysqli_connect($servername, $server_username, $server_password, $database);


/*--------------------------------------------------------------
# END OF FILE
# Author: Xingyun Zeng
--------------------------------------------------------------*/

?>