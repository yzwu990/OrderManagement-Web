<?php

# Author: Yanzhang Wu, Xingyun Zeng
# CST8285 Web Programming
# Assignment 2
# Backend PHP Script - functions
# This is the PHP file for backend server. It receives JS post
# methods, then interacts with MySQL database, then send back
# responses to JS.
# requests and responses are in JSON format


// set post to decode json 
$_POST = json_decode(file_get_contents('php://input'), true);
$role = $_POST['token'];

// controller function; detects function name and run it
$functionName = $_POST['func'];
if (function_exists($functionName)) { // check if function exists
    $functionName($role); // run function
}


/*--------------------------------------------------------------
# Codes below were firstly wrote by Xingyun Zeng, then
# edited by Yanzhang Wu
--------------------------------------------------------------*/


// check name and password when login
function login($role)
{
    $token = array('token' => $role);

    include 'connect.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM $role WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    // search name first
    try {
        if (mysqli_num_rows($result) == 0) {
            http_response_code(404);
        }
    } catch (mysqli_sql_exception $e) {
        http_response_code(400);
    }

    // if finds the name, check password
    try {
        while ($row = mysqli_fetch_assoc($result)) {
            $resultPassword = $row['password'];
            if ($password == $resultPassword) {
                echo json_encode($token);
            } else {
                http_response_code(404);
            }
        }
    } catch (mysqli_sql_exception $e) {
        echo json_encode($e);
        http_response_code(400);
    }

    $conn->close();
}


// show table
function showTable($role)
{
    include 'connect.php';

    $sql = "SELECT * FROM $role";
    $result = mysqli_query($conn, $sql);


    try {
        if ($result->num_rows > 0) {

            while ($row = $result->fetch_assoc()) {

                $s[] = $row;
            }

            echo json_encode($s);

        } else {
            http_response_code(404);
        }
    } catch (mysqli_sql_exception $e) {
        echo json_encode($e);
        http_response_code(400);
    }

    $conn->close();
}


// update admin or user
function update($role)
{
    include 'connect.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
    $id = $_POST['id'];

    $updateRole = "UPDATE $role SET username = '$username', password = '$password' WHERE id = $id;";

    // Set name to 'temp' to avoid same username error
    $removeName = "UPDATE $role SET username = 'temp' WHERE id = $id;";
    $removeResult = mysqli_query($conn, $removeName);

    $sql = "SELECT * FROM $role WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    try {
        if (mysqli_num_rows($result) == 0) {

            $result = mysqli_query($conn, $updateRole);
            echo json_encode($result);
        } else {
            http_response_code(409);
        }
    } catch (mysqli_sql_exception $e) {
        echo json_encode($e);
        http_response_code(400);
    }

    $conn->close();
}


// update item table
function updateItem($role)
{
    include 'connect.php';

    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $size = $_POST['size'];
    $color = $_POST['color'];
    $location = $_POST['location'];
    $status = $_POST['status'];
    $intake_date = $_POST['intake_date'];

    $updateitem = "UPDATE $role SET name = '$name', price = '$price',quantity = '$quantity',size = '$size',color = '$color',location = '$location',status = '$status',intake_date = '$intake_date' WHERE id = $id;";

    try {
        if ($result = mysqli_query($conn, $updateitem) == true) {
            echo json_encode($result);
        } else {
            http_response_code(406);
        }

    } catch (mysqli_sql_exception $e) {
        http_response_code(406);
    }

    $conn->close();
}


// delete row
function deleteRow($role)
{
    include 'connect.php';

    $id = $_POST['id'];

    $deleterow = "DELETE FROM $role WHERE id = $id;";

    try {
        $result = mysqli_query($conn, $deleterow);
        echo json_encode($result);
    } catch (mysqli_sql_exception $e) {
        echo json_encode($e);
        http_response_code(400);
    }

    $conn->close();
}



// add admin or user
function add($role)
{
    include 'connect.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
    $id = $_POST['id'];

    $sql = "SELECT * FROM $role WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if ($id == '') {
        $insert = "INSERT INTO $role (username, password ) VALUES ('$username','$password')";
    } else {
        $insert = "INSERT INTO $role VALUES($id,'$username','$password')";
    }

    // search name first
    try {
        if (mysqli_num_rows($result) == 0) {
            $result = mysqli_query($conn, $insert);
            echo json_encode($result);
        } else {
            http_response_code(409);
        }
    } catch (mysqli_sql_exception $e) {
        echo json_encode($e);
        http_response_code(400);
    }

    $conn->close();
}


// add item
function addItem($role)
{
    include 'connect.php';

    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $size = $_POST['size'];
    $color = $_POST['color'];
    $location = $_POST['location'];
    $status = $_POST['status'];
    $intake_date = $_POST['intake_date'];

    if ($id == '') {
        $insertitem = "INSERT INTO $role(name,price,quantity,size,color,location,status,intake_date) VALUES('$name','$price','$quantity','$size','$color','$location','$status','$intake_date')";
    } else {
        $insertitem = "INSERT INTO $role VALUES('$id', '$name','$price','$quantity','$size','$color','$location','$status','$intake_date')";
    }

    try {
        if ($result = mysqli_query($conn, $insertitem) == true) {
            echo json_encode($result);
        } else {
            http_response_code(406);
        }
    } catch (mysqli_sql_exception $e) {
        http_response_code(406);
    }

    $conn->close();

}


/*--------------------------------------------------------------
# Codes above were firstly wrote by Xingyun Zeng, then
# edited by Yanzhang Wu
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# END OF FILE
# Author: Yanzhang Wu, Xingyun Zeng
--------------------------------------------------------------*/
?>