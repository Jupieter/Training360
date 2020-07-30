var serverUrl = "http://localhost:3000/foods"
// Keys of users
let keys = [ "id",
"active", 
"foodType",  
"action", 
"foodname", 
"ingredients", 
"price",
"piece"];

function createAnyElement(name, attributes) {
    let element = document.createElement(name)
    for (const k in attributes) {
        element.setAttribute(k, attributes[k])
    }
    return element;
}
// Create haed row
function createTableHeader(keys, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error('Table is not found')
        return;
    };
    let tHead = document.querySelector(`thead`)
    tHead.innerHTML = "";
    let tr = createAnyElement("tr");
    for (const k in keys) {
        let th = createAnyElement("th");
        th.innerHTML = keys[k]+": ";
        th.setAttribute("style:", "color: #ff0000");
        tr.appendChild(th);
    }
    tHead.appendChild(tr);
}
createTableHeader(keys, "usersTable")

// Get data from the server
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}


// Fill table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error('Table is not found')
        return;
    }
    // Add new user row to the table
    let tBody = table.querySelector("tBody"); // console.log(tBody);
    tBody.innerHTML = "";
    let newRow = newUserRow();
    tBody.appendChild(newRow);

    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td")
            let input = createAnyElement("input", {
                class: "form-control",
                value: row[k],
                name: k
            });
            if (k == "id") {
                input.setAttribute("readonly", true);
            }
            td.appendChild(input)
            tr.appendChild(td);
        }
        let btnGroup = createeBtnGroup();   // console.log(tr);
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);
    }
}

function startGetUsers() {
    getServerData(serverUrl).then(
        data => fillDataTable(data, "usersTable"),
        err => console.error(err)
    );
};
document.querySelector("#getDataBtn").addEventListener("click", startGetUsers());

function createeBtnGroup() {
    let group = createAnyElement("div", { 
        class: "btn btn-group",
        style: "margin: 0px; padding: 0px",
     });
    let infoBtn = createAnyElement("button", { 
        class: "btn btn-success", 
        onclick: "setRow(this)", 
        style: "margin: 0px" });
    infoBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    
    let delBtn = createAnyElement("button", { 
        class: "btn btn-danger", 
        onclick: "delRow(this)" , 
        style: "margin: 0px"});
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    
    group.appendChild(infoBtn);
    group.appendChild(delBtn);
    
    let td = createAnyElement("td");
    td.appendChild(group)
    return td;
}
// Delete User
function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let tid = typeof (id);
    console.log(id, tid);
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
    };
    let actUrl = serverUrl + "/" + id;
    // console.log(actUrl);
    fetch(actUrl, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers()
        }
    )
}
// Create new user.
function newUserRow(row) {
    let tr = createAnyElement("tr",{
        style: "text-align: center;"
    });
    // let nullRow = { "id": "", "firstname": "", "lastname": "", "email": "", "passw": "" }
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }
    let newBtn = createAnyElement("button", {
        class: "btn btn-success",
        onclick: "createUser(this)",
    });
    newBtn.innerHTML = '<i class="fas fa-plus-circle"></i>';
    newBtn.style.margin = "0px"
    let td = createAnyElement("td");
    td.setAttribute("style", "background-color: #eeffee;"); // to learn
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

function createUser(btn) {
    let tr = btn.parentElement.parentElement;
    let data = getRowData(tr);
    console.log(data);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let actUrl = serverUrl;
    console.log(actUrl);
    fetch(actUrl, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();
            console.log(data);
        }
    )
}
function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
        console.log(data)

    }
    console.log(data);
    return data;
}

// Set data
function setRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr)
    console.log(data);
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    let actUrl = serverUrl;
    actUrl = serverUrl + "/" + data.id;
    console.log(actUrl);
    fetch(actUrl, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();
            console.log(data);
        }
    )
}