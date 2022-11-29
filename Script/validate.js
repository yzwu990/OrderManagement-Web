/*--------------------------------------------------------------
# Author: Yanzhang Wu
# CST8285 Web Programming
# Assignment 2
# Frontend JavaScript script
# This is the JavaScript file for frontend validation. 
--------------------------------------------------------------*/


// signup is optional. If signup is received,
// it will call userSignup; otherwise, it's
// login process.
function validate(role, signup) {
    // Return conditions.
    let flag = true;

    if (signup != null) {
        if (check(flag) == true) {
            // signup function
            userSignup(role);
        }
    } else {
        if (check(flag) == true) {
            // login function
            postForm(role);
        }
    }
}


// check with regular expressions
function check(flag) {
    // Clear error messages
    var error = document.getElementsByClassName("error");
    for (let i = 0, lenError = error.length; i != lenError; i++) {
        error[0].remove();
    }

    // Get values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // check if there is retype password field (signup page)
    if (document.getElementById("password_re") != null) {
        var password2 = document.getElementById("password_re").value;
    }

    /* Regular expressions */

    // User name: can not be empty, less than 20 characters
    let usernameRegEx = /^[a-zA-Z0-9]{1,19}$/;

    // Password: at least 6 characters, at least 1 uppercase letter and at least 1 lowercase letter
    let passwordRegex = /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$/


    // Check Username
    if (!usernameRegEx.test(username)) {
        flag = false;
        errorMessage("userInput", "\u2718 User name should be non-empty,and within 20 characters long.");
    } else {
        login = document.getElementById("username").value.toLowerCase();
        document.getElementById("username").value = login;
    }

    // Check Password
    if (!passwordRegex.test(password)) {
        flag = false;
        errorMessage("passwordInput", "\u2718 Password should be at least 6 characters:1 uppercase,1 lowercase.");
    }

    // if signup page
    if (password2 != null) {
        // Check Re-type Password
        if (password2 !== password || !passwordRegex.test(password2)) {
            flag = false;
            errorMessage("passwordReInput", "\u2718 Please retype password.");
        }
    }

    return flag;
}



// Display error messages
function errorMessage(parentNode, message) {

    var messageP = document.createElement("p");
    messageP.className = "error";
    messageP.style.color = "red";
    messageP.style.backgroundColor = "white";
    messageP.style.marginBottom = "10px";
    messageP.style.padding = "5px 5px";
    messageP.style.textAlign = "center";
    messageP.style.borderRadius = "5px";
    var parent = document.getElementById(parentNode);
    parent.prepend(messageP);
    messageP.innerHTML = message;
}


/*--------------------------------------------------------------
# END OF FILE
# Author: Yanzhang Wu
--------------------------------------------------------------*/
