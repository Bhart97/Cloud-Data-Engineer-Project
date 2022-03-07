// executes when the page loads
window.onload = function () {
    displayOptions();
    createTable();
}

var listOfCohorts = [];
var stateName = "id";               // name of current column (default is the id column)
var stateSort = "none";       // sort order of current column (default is asc)

/**
 * Performs SQL query to get a list of cohort.
 */
function displayOptions() {
    var req = new XMLHttpRequest();
    req.open("GET", "/cohorts", true);
    req.setRequestHeader("Content-Type", "application-json");
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            let response = JSON.parse(req.responseText);
            for (let i = 0; i < response.length; i++) {
                let row = response[i];
                listOfCohorts[i] = row["cohort"];
            }
        }
        // async means that this function should be called after response
        generateOptions();
    });
    req.send();
}

/**
 * Generates the checkbox options and search button
 */
function generateOptions() {
    let options = document.getElementById("cohort-options");

    // creates checkbox and label for each option
    for (let i = 0; i < listOfCohorts.length; i++) {
        // checkbox attributes
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.classList.add("cohort-checkbox");
        checkbox.name  = listOfCohorts[i][0];
        checkbox.value = listOfCohorts[i];

        // label attributes
        let label = document.createElement("label");
        label.for = listOfCohorts[i][0];
        label.innerHTML = listOfCohorts[i];
        label.style.marginRight = "10px";

        // update DOM element
        options.append(checkbox);
        options.append(label);
    }

    // creates the search button with functionality
    let button = document.createElement("button");
    button.innerHTML = "search";
    button.style.marginLeft = "10px";
    button.addEventListener("click", updateTable);
    options.append(button);
}


/**
 * Returns the String version of the selected cohorts.
 * 
 * @returns String
 */
function selectedOptions() {
    let checkbox = document.getElementsByClassName("cohort-checkbox");
    let checked = "("
    for (let i = 0; i < checkbox.length; i++) {
        let option = checkbox[i];
        if (option.checked) {
            checked += "'" + option.value + "', "
        }
    }
    if (checked == "(") {
        return "(NULL)";
    }
    return checked.slice(0, -2) + ")";
}

/**
 * Creates the table with its headers.
 **/
function createTable() {
    let div = document.getElementById("main-table");
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");

    let req = new XMLHttpRequest();
    req.open("GET", "/create", true);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            let response = JSON.parse(req.responseText);
            let columns = Object.keys(response[0]);

            for (let i = 0; i < columns.length; i++) {
                // identifies the column and creates the necessary DOM elements
                let value = columns[i];
                let th = document.createElement("th");
                let outer = document.createElement("div");
                let inner = document.createElement("div");

                // the cohort will be sorted by id
                outer.classList.add("arrow");
                if (value == "id") {
                    inner.classList.add("up-arrow");
                } else {
                    inner.classList.add("none");
                }

                // adds CSS and functionality to the column
                outer.innerHTML = value;
                inner.style.display = "inline-block";
                inner.style.marginLeft = "10px";
                outer.addEventListener("click", sortTable);
                outer.append(inner);

                th.appendChild(outer);
                tr.appendChild(th);
            }

            thead.append(tr);
            table.append(thead);
            table.append(tbody);
            div.append(table);
            createBody(response);
        }
    });
    req.send();
}
/**
 * The main method of updating the table body based on the received query-set.
 * 
 * @param {Object array} data 
 */
function createBody(data) {
    // clears the current table
    let div = document.getElementById("main-table");
    let tbody = div.childNodes[0].childNodes[1];
    tbody.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement("tr");
        let row = data[i];
        for (let col in row) {
            let td = document.createElement("td");

            if (col == "LinkedIn") {
                let a = document.createElement("a");
                let value = row[col];

                if (value != "") {
                    a.setAttribute("href", value);
                    a.innerHTML = "Profile Link";
                } else {
                    a.setAttribute("href", "#null");
                    a.innerHTML = "Missing";
                }
                td.append(a);

            } else {
                td.innerHTML = row[col];
            }
            tr.append(td);
        }
        tbody.append(tr);
    }
}

/**
 * Sorts the table based on the selected column by performing a SQL query.
 */ 
function sortTable() {
    let inner = event.target.firstChild.nextSibling;
    let value = event.target.firstChild.data;           // column name
    let state = inner.classList[0];                     // column state [none, desc, asc]

    // clears all arrows so that only one arrow is displayed at a time
    let arrows = document.getElementsByClassName("arrow");
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].firstChild.nextSibling.classList.replace("down-arrow", "none");
        arrows[i].firstChild.nextSibling.classList.replace("up-arrow", "none");
    }

    let params = "?" + "cohorts=" + selectedOptions();
    params += `&order=${value}&sort=`;
    switch(state) {
        case "none":
            inner.classList.replace("none", "up-arrow");
            params += "ASC";
            break;
        case "down-arrow":
            inner.classList.replace("none", "up-arrow");
            params += "ASC";
            break;
        case "up-arrow":
            inner.classList.replace("none", "down-arrow");
            params += "DESC";
            break;
    }

    stateName = value;
    stateSort = inner.classList[0];

    var req = new XMLHttpRequest();
    req.open("GET", "/search" + params, true);
    req.setRequestHeader("Content-Type", "application-json");
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            let response = JSON.parse(req.responseText);
            createBody(response);
        }
    });
    req.send();
}

/**
 * Updates the table if the search button was pressed.
 */
function updateTable() {
    let params = "?" + "cohorts=" + selectedOptions();
    params += `&order=${stateName}&sort=`;
    switch (stateSort) {
        case "none":
            params += "ASC";
            break;
        case "up-arrow":
            params += "ASC";
            break;
        case "down-arrow":
            params += "DESC";
            break;
    }

    var req = new XMLHttpRequest();
    req.open("GET", "/search" + params, true);
    req.setRequestHeader("Content-Type", "application-json");
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            let response = JSON.parse(req.responseText);
            createBody(response);
        }
    });
    req.send();
}