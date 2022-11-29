// Author: Thanwa Chaichankanchang
// CST8285 Web Programming
// Assignment 2
// JavaScript file for dataDisplay page (management.html & itemManagement.html)

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
  for (var i = 1; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[1];

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

//add active class to a filter button once clicked
var btns = document.getElementsByClassName("filter-btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].classList.remove("active");
    }

    this.classList.add("active");
  });
}

//when typing in a search box, remove active class from filter buttons
var input = document.getElementById("search-input");
input.addEventListener("keydown", function () {
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
});

function sortTable(option) {
  var value = option.value;
  var table = document.getElementById("data-table");
  var switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    var rows = table.getElementsByTagName("tr");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (var i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      var shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      var x, y;

      if (value.indexOf("id") > -1) {
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
      }

      if (value.indexOf("qty") > -1) {
        x = rows[i].getElementsByTagName("TD")[3];
        y = rows[i + 1].getElementsByTagName("TD")[3];
      }

      if (value.indexOf("price") > -1) {
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
      }

      if (value.indexOf("date") > -1) {
        x = rows[i].getElementsByTagName("TD")[8];
        y = rows[i + 1].getElementsByTagName("TD")[8];
        console.log(x.innerText);
        console.log(y.innerText);
      }


      // Sort date. User Date.parse() to compare the dates
      if (typeof (x.innerText) == 'string' || typeof (y.innerText) == 'string') {
        // Check if the two rows should switch place:
        if (value.indexOf("asc") > -1) {
          if (Date.parse(x.innerText) > Date.parse(y.innerText)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }

        if (value.indexOf("desc") > -1) {
          if (Date.parse(x.innerText) < Date.parse(y.innerText)) {
            shouldSwitch = true;
            break;
          }
        }
      }


      // Check if the two rows should switch place:
      if (value.indexOf("asc") > -1) {
        if (Number(x.innerText) > Number(y.innerText)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }

      if (value.indexOf("desc") > -1) {
        if (Number(x.innerText) < Number(y.innerText)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
