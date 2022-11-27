function sendRequest(url, method, body, callback) {
  //create XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  //open a get request with the remote server URL
  xhr.open(method, url);
  //send the Http request
  //send() accepts an optional parameter which lets you specify the request's body; this is primarily used for requests such as PUT. If the request method is GET or HEAD, the body parameter is ignored and the request body is set to null.
  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(body);

  //EVENT HANDLERS...

  //triggered when the response is completed
  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
      //parse JSON datax`x
      console.log(xhr.response);
      let data = JSON.parse(xhr.response);
      alert(JSON.stringify(data));

      // other callbacks...
      callback(data);


    } else if (xhr.status === 404) {
      console.log("No records found");
    }
  }

  //triggered when a network-level error occurs with the request
  xhr.onerror = function () {
    console.log("Network error occurred");
  }

}


function domUpdate(data) {
  const div = document.createElement('div');
  div.innerText = data[0].title;
  document.body.appendChild(div);
}

function submitAction() {
  sendRequest('https://jsonplaceholder.typicode.com/posts', 'GET', undefined, domUpdate);
}

function postDomUpdate(data) {
  const div = document.createElement('div');
  div.innerText = "post success";
  document.body.appendChild(div);

}

function postAction() {
  const bodyData = JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  })
  sendRequest('https://jsonplaceholder.typicode.com/posts', 'POST', bodyData, postDomUpdate);


}

function postTest() {
  let bodyData = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    func: 'checkName'
  })

  sendRequest('http://localhost/submitTest.php', 'POST', bodyData, postDomUpdate);



}



function tableTest() {
  let bodyData = JSON.stringify({
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    func: 'showTable'
  })
  sendRequest('http://localhost/submitTest.php', 'POST', bodyData, addTable);

};



function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function addTable(data) {
  const tab = document.createElement('table');
  document.body.appendChild(tab);
  let table = document.querySelector("table");
  let tableData = Object.keys(data[0]);
  generateTableHead(table, tableData);
  generateTable(table, data);
}

/* this section is for php */

function submit_registration() {
  
  sendRequest('http://localhost/Backend/register_submit.php', 'POST', undefined, null);
}

function validate_register() {
  
  var loginValid = true;
    
  alert("validate_register()");
  alert(register_username);

  if(!loginValid) {
    
    alert('Registration unsuccessful');
    return false;
  }

  // // I dont know what submit does
  // document.getElementById("register_form").submit();

  alert('Registration successful');
  let bodyData = JSON.stringify({
    register_username: document.getElementById("register_username").value,
    register_password: document.getElementById("register_password").value,
    func: 'checkName'
  })

  sendRequest('http://localhost/Backend/register_submit.php', 'POST', bodyData, postDomUpdate);

    
}


/* php section ends */