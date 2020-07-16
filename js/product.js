var serverUrl1 = "http://localhost:3000/foodTypes";
var serverUrl2 = "http://localhost:3000/keys";
var serverUrl3 = "http://localhost:3000/foods";
let tableId = ["Food1", "Food2", "Food3", "Food4", "Food5"];
let keys = [];

function createAnyElement(name, attributes) {
    let element = document.createElement(name)
    for (const k in attributes) {
        element.setAttribute(k, attributes[k])
    }
    return element;
}
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
getServerData(serverUrl2).then(
    data => craeteAllTableHeader(data),
    err => console.error(err)
);

function createTableHeader(keys, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error('Table is not found')
        return;
    };
    table.innerHTML = ""

    // let tHead = document.querySelector(`thead`)

    let tHead = createAnyElement("thead");
    let tBody = createAnyElement("tbody");
    let tr = createAnyElement("tr");

    for (let k = 3; k < keys.length; k++) {
        let th = createAnyElement("th");
        th.innerHTML = keys[k] + ": ";
        // th.setAttribute("style:", "color: #ff0000");
        tr.appendChild(th);
    }
    tHead.appendChild(tr);
    table.appendChild(tHead);
    table.appendChild(tBody);
}
function craeteAllTableHeader(keys) {
    for (let i = 0; i < tableId.length; i++) {
        createTableHeader(keys, tableId[i]);
    }

}

// Fill table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error('Table is not found')
        return;
    }
    let tBody = table.querySelector("tBody"); // console.log(tBody);
    tBody.innerHTML = "";

    let tr = createAnyElement("tr");
    let szar = data[0].active;
    console.log(szar);
    if (data.active) {

        for (let row of data) {
            console.log(row);
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

}
getServerData(serverUrl3).then(
    data => fillDataTable(data, "Food1"),
    err => console.error(err)
);