<?php
    include_once 'dbh.inc.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Register</title>
    <link rel="stylesheet" href="./Style/portal.css">
    <link rel="stylesheet" href="./Style/index.css">
</head>

<body>

    <?php 
        $sql = "SELECT id FROM logindetails;";
        $result = mysqli_query();

    ?>

    <form action="../dataDisplay.html" method="get" onsubmit="return validate_register();">
        <div class="box">
            <h2>User Register</h2>
            <div class="inputBox">
                <input type="text">
                <span>username</span>
                <i></i>
            </div>
            <div class="inputBox">
                <input type="password">
                <span>password</span>
                <i></i>
            </div>
            <div class="inputBox">
                <input type="password">
                <span>Retype password</span>
                <i></i>
            </div>

            <div class="buttonBox">
                <button type="submit">REGISTER</button>
            </div>
        </div>
    </form>
    <img src="./Image/earth.svg" alt="">
    <!-- Footer -->
    <footer>
        <div>
            <p>Copyright @Yanzhang Wu, Thanwa Chaichankanchang, Boling Zhang, Xingyun Zeng </p>
        </div>
    </footer>
</body>


</html>