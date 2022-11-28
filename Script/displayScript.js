// Author: Thanwa Chaichankanchang
// CST8285 Web Programming
// Assignment 2
// JavaScript file for dataDisplay page

function searchData(data) {
  //get the user input
  var input = document.getElementById("search-input");
  var filter = input.value.toUpperCase();
  
  //if no parameter is passed, filter with user input
  if (data == undefined) {
    showFiltered(filter);
  }

  //if a parameter is passed, filter with the parameter
  if (data) {
    showFiltered(data);
  }
}

function showFiltered(filter) {
  var table = document.getElementById("data-table");
  var tr = table.getElementsByTagName("tr");
  
  //loop thru each row of the table to see if the item name matched with the passing parameter
  //if not matched, do not show that row
  for (var i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

var btns = document.getElementsByClassName("filter-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].classList.remove("active");
    
    this.classList.add("active");   
  });
}

// var input = document.getElementById("search-input");
// input.addEventListener("focus", function() {
//   for (var i = 0; i < btns.length; i++) {
//     btns[i].classList.remove("active");
//   }
// })

