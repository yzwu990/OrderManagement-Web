/*--------------------------------------------------------------
# Author: Yanzhang Wu
# CST8285 Web Programming
# Assignment 2
# Frontend JavaScript script
# This is the JavaScript file for frontend functions. It includes 
# all methods interacting with the PHP server. For example, there
# are methods about creating connections to the server, sending
# requests, receiving response, creating tables, CRUD functions,
# and so on.
# requests and responses are in JSON format
--------------------------------------------------------------*/



function sendRequest(url, method, body, callback, role) {
  // create XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  // open a get request with the remote server URL
  xhr.open(method, url);
  // send the Http request
  // send() accepts an optional parameter. If the request method is GET or HEAD, 
  // the body parameter is ignored and the request body is set to null.
  // send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(body);


  // triggered when the response is completed
  xhr.onload = function () {
    // connections with success
    if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {

      // print response in console for debugging
      console.log(xhr.response)

      // parse JSON datax`x
      let data = JSON.parse(xhr.response);


      // callback function. It will be called after receiving responses from the backend
      if (role) {
        callback(role)
      } else {
        callback(data);
      }

      // 404 error. This is used in login page
    } else if (xhr.status === 404) {



      if (document.querySelector(".errorMessage") != null) {
        document.querySelector(".errorMessage").remove();
      }
      let span = document.createElement("span");
      span.className = "errorMessage";
      span.style.color = "red";
      span.style.borderRadius = "5px";
      span.style.background = "white";
      span.innerHTML = "Username and/or password doesn't match, plase try again.";
      span.style.borderRadius = "5px";
      span.style.fontSize = "20px";
      span.style.padding = "10px";
      document.getElementById('passwordInput').after(span)

      // 409 error. Happends when username has been used when signup
    } else if (xhr.status === 409) {



      if (document.querySelector("h2") != null) { //from signup page
        document.querySelector("h2").remove();
        let header2 = document.createElement("h2");
        header2.style.color = "red";
        header2.style.background = "white";
        header2.innerHTML = "This username has been used. Try a new username instead.";
        document.getElementsByClassName("box")[0].prepend(header2);
      } else { // from table page
        let header2 = document.createElement("h2");
        header2.style.color = "red";
        header2.style.background = "white";
        header2.style.borderRadius = "5px";
        header2.innerHTML = "This username has been used. Try a new username instead.";
        document.getElementById("data-table").after(header2);
        // remove error message after 3 seconds
        setTimeout("document.querySelector('h2').remove()", 3000);
      }

    } else if (xhr.status === 406) {


      let header2 = document.createElement("h2");
      header2.style.color = "red";
      header2.style.background = "white";
      header2.style.borderRadius = "5px";
      header2.innerHTML = "Invalid input. Please check and try again";
      document.getElementById("data-table").after(header2);
      // remove error message after 3 seconds
      setTimeout("document.querySelector('h2').remove()", 3000);
    }

  }

  // triggered when a network-level error occurs with the request
  xhr.onerror = function () {
    console.log("Network error occurred");
  }

}

// direct to next page when login with success
function LoginSuccess(data) {

  // save a token to local storage. It will be used to check if user is loggedin
  // and to generate corresponding function and variables

  localStorage.setItem('token', JSON.stringify(data));
  const getLocalStorage = localStorage.getItem('token');
  const getToken = JSON.parse(getLocalStorage).token;

  if (getToken == 'user') {
    location.href = './itemManagement.html';
  } else {
    location.href = './management.html';
  }
}

// post login user login info
function postForm(token) {
  let bodyData = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    func: 'login',
    token: token
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, LoginSuccess);
}


// display table
function showTable(token) {
  let bodyData = JSON.stringify({
    func: 'showTable',
    token: token
  })
  localStorage.setItem('token', JSON.stringify({ "token": token }));

  // clear header if exists
  if (document.querySelector("div h1") != null) {
    document.querySelector("div h1").remove();
  };

  // create corresponding header
  let header1 = document.createElement('h1');
  header1.innerText = token.toUpperCase() + ' MANAGEMENT';
  header1.className = "main-heading";
  document.querySelector('body div').appendChild(header1);

  // if addrow is disabled
  let addrow = document.getElementById('addRow');
  addrow.disabled = false;

  sendRequest('./backend/backend.php', 'POST', bodyData, addTable);

}


// Generate Tablehead
function generateTableHead(table, data) {
  let row = table.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
  let th = document.createElement("th");
  let manageText = document.createTextNode('Manage Record');
  th.appendChild(manageText);
  row.appendChild(th);
}


// Generate Table data
function generateTable(table, data, token) {

  var i = 1;
  for (let element of data) {

    let row = table.insertRow();

    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      let span = document.createElement('span');
      cell.appendChild(span)
      span.appendChild(text);
      row.setAttribute('id', 'row' + i);
      cell.className = "row" + i;

    }
    // edit record button
    let editCell = row.insertCell();
    let editButton = document.createElement('button');
    editButton.setAttribute('id', 'edit' + i);
    editButton.innerHTML = "Edit record";
    editCell.appendChild(editButton);
    // set onclick function
    editButton.setAttribute('onclick', 'edit(' + i + ')');

    // delete record button
    let delButton = document.createElement('button');
    delButton.setAttribute('id', 'del' + i);
    delButton.innerHTML = "Delete record";
    editCell.appendChild(delButton);
    // set onclick function
    delButton.setAttribute('onclick', `deleteRow('${token}')`);
    delButton.setAttribute('disabled', true);

    // confirm change button
    let confirmButton = document.createElement('button');
    confirmButton.setAttribute('onclick', `update_${token}('${token}')`);
    confirmButton.setAttribute('id', 'confirm' + i);
    confirmButton.innerHTML = "Confirm change";
    editCell.appendChild(confirmButton);

    i++;
  }


}

// Add table to DOM
function addTable(data) {

  // remove table if exists
  if (document.querySelector("table") != null) {
    document.querySelector("table").remove();
  }

  // create table and tableData
  const tab = document.createElement('table');
  tab.setAttribute('id', 'data-table');
  document.getElementsByClassName('content')[0].appendChild(tab);
  let table = document.querySelector("table");
  let tableData = Object.keys(data[0]);

  // get token from local storage
  const getLocalStorage = localStorage.getItem('token');
  const getToken = JSON.parse(getLocalStorage).token;

  // call below functions to generate table contents
  generateTableHead(table, tableData);
  generateTable(table, data, getToken);
}



// Edit records
function edit(row) {

  var x = document.getElementsByClassName("row" + row);
  var i;

  for (i = 0; i < x.length; i++) {
    var ttt = document.createElement("input");
    var preval = x[i].firstChild.innerText;
    ttt.setAttribute("value", preval);
    // ttt.setAttribute("readonly", "true");
    var spanInTD = document.querySelector(".row" + row + " span");
    x[i].replaceChild(ttt, spanInTD);
    document.querySelector("td input").setAttribute("readonly", "true");
  }

  document.getElementById('del' + row).disabled = false;

};


// Update User
function update_user(token) {

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];

  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }

  let bodyData = JSON.stringify({
    username: inputs[0],
    password: inputs[1],
    func: 'update',
    token: token,
    id: document.querySelector("td input").value
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

};


// Update Admin
function update_admin(token) {

  if (document.querySelector("h2") != null) {
    document.querySelector("h2").remove();
  }

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];
  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }

  let bodyData = JSON.stringify({
    username: inputs[0],
    password: inputs[1],
    func: 'update',
    token: token,
    id: document.querySelector("td input").value
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

};

// Update item
function update_item(token) {

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];
  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }

  let bodyData = JSON.stringify({
    name: inputs[0],
    price: inputs[1],
    quantity: inputs[2],
    size: inputs[3],
    color: inputs[4],
    location: inputs[5],
    status: inputs[6],
    intake_date: inputs[7],
    func: 'updateItem',
    token: token,
    id: document.querySelector("td input").value
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

};



// Delete Rows
function deleteRow(token) {

  let bodyData = JSON.stringify({
    func: 'deleteRow',
    token: token,
    id: document.querySelector("td input").value
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

}



// Add Rows
function addRow() {

  if (document.querySelector("table") != null) {

    let addOneRow = document.querySelector("table").insertRow();
    let numberOfCol = document.getElementsByTagName('table')[0].rows[0].cells.length - 1;

    for (i = 0; i < numberOfCol; i++) {
      let cell = addOneRow.insertCell();

      let input = document.createElement('input');
      cell.appendChild(input)
    }

    let cell = addOneRow.insertCell();
    let confirmButton = document.createElement('button');

    //get token from local storage
    const getLocalStorage = localStorage.getItem('token');
    const getToken = JSON.parse(getLocalStorage).token;

    confirmButton.setAttribute('onclick', `add_${getToken}('${getToken}')`);
    confirmButton.innerHTML = "Confirm Add";
    cell.appendChild(confirmButton);

    let addrow = document.getElementById('addRow');
    addrow.disabled = true;
  }

}

// Add user from table
function add_user(token) {

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];

  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }

  let bodyData = JSON.stringify({
    username: inputs[0],
    password: inputs[1],
    func: 'add',
    token: token,
    id: document.querySelector("td input").value
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

}



// Register user
function userSignup(token) {

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];
  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }

  let bodyData = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    func: 'add',
    token: token,
    id: ''
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, redirect);

}


// Redirect to login page after signup with success
function redirect() {

  let h2 = document.querySelector('h2')
  h2.style.background = 'white';
  h2.style.padding = '10px';
  h2.innerHTML = 'Signup Success! Redirect to user login page in 2 seconds!'

  setTimeout("location.href = './userLogin.html'", 2000);

}


// Add admin
function add_admin(token) {

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];

  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }

  let bodyData = JSON.stringify({
    username: inputs[0],
    password: inputs[1],
    func: 'add',
    token: token,
    id: document.querySelector("td input").value
  })




  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

}


// Add item
function add_item(token) {

  var tdInput = document.querySelectorAll("td input");
  var i;
  var inputs = [];
  for (i = 1; i < tdInput.length; i++) {

    inputs.push(tdInput[i].value);
  }
  console.log(inputs.toString());

  let bodyData = JSON.stringify({
    name: inputs[0],
    price: inputs[1],
    quantity: inputs[2],
    size: inputs[3],
    color: inputs[4],
    location: inputs[5],
    status: inputs[6],
    intake_date: inputs[7],
    func: 'addItem',
    token: token,
    id: document.querySelector("td input").value
  })

  sendRequest('./backend/backend.php', 'POST', bodyData, showTable, token);

};


// Log out
function logout() {
  localStorage.clear();
  location.href = './index.html';
}

function reset() {

  if (document.getElementsByClassName('filter-btn active')[0] == undefined) {
    showTable('item');
  } else {

    let activeClass = document.getElementsByClassName('filter-btn active')[0];
    activeClass.className = 'filter-btn';
    let filterAll = document.getElementById("filterAll");
    filterAll.className = 'filter-btn active';
    showTable('item');
  }
}


function resetManagement() {
  const getLocalStorage = localStorage.getItem('token');
  const getToken = JSON.parse(getLocalStorage).token;
  showTable(getToken);
}




/*--------------------------------------------------------------
# END OF FILE
# Author: Yanzhang Wu
--------------------------------------------------------------*/
