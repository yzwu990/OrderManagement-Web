/*--------------------------------------------------------------
# Author: Yanzhang Wu
# CST8285 Web Programming
# Assignment 2
# Frontend JavaScript script 
# This is the JavaScript file for frontend. It check if user 
# is logged in before access to the data. If it's not, redirect
# to the login page
--------------------------------------------------------------*/


function checkToken(token) {

    // if there is a token
    if (localStorage.getItem('token') != null) {
        let getLocalStorage = localStorage.getItem('token');
        let getToken = JSON.parse(getLocalStorage).token;

        // if user logged in, change token to "item"
        // so the table could display automatically
        if (getToken === 'user') {
            getToken = "item";
        }

        if (getToken !== token) { // token doesn't match the role

            // set loading
            document.querySelector(
                ".loading").style.display = "none";
            document.querySelector(
                ".redirect").style.display = "block";
            document.querySelector(
                ".redirect").style.visibility = "visible";

            setTimeout("location.href = './index.html'", 2000);
        } else { //pass validation
            document.querySelector(
                "body").style.visibility = "visible";
            document.querySelector(
                ".loading").style.display = "none";
            document.querySelector(
                "img").style.display = "none";

            // display table
            showTable(token);
        }
        // if there is no token (user doesn't log in)
    } else {
        document.querySelector(
            ".loading").style.display = "none";
        document.querySelector(
            ".redirect").style.display = "block";
        document.querySelector(
            ".redirect").style.visibility = "visible";

        setTimeout("location.href = './index.html'", 2000);
    }

}

// body onload this function to check tokens
function loading(token) {

    // set loading info 
    document.querySelector(
        "body").style.visibility = "hidden";
    document.querySelector(
        "img").style.visibility = "visible";
    document.querySelector(
        ".loading").style.visibility = "visible";
    document.querySelector(
        ".redirect").style.display = "none";

    // display loading info for 3 seconds
    setTimeout(() => {
        let flag = false;
        checkToken(token);
    }, 3000);

};



// clear token when leave or refresh the page
window.onbeforeunload = function () {
    localStorage.clear();
    return '';
};



/*--------------------------------------------------------------
# END OF FILE
# Author: Yanzhang Wu
--------------------------------------------------------------*/






