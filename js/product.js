var serverUrl1 = "http://localhost:3000/foodTypes";
var serverUrl2 = "http://localhost:3000/keys";
var serverUrl3 = "http://localhost:3000/foods";
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
let keysPromise = getServerData(serverUrl2)
console.log(keysPromise);
keysPromise.then(
    data => craeteAllTableHeader(data),
    err => console.error(err)
    );
// console.log(data);
    

function createTableHeader(keys, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error('Table is not found')
        return;
    };
    table.innerHTML = ""
    
    // let tHead = document.querySelector(`thead`)

    let tHead = createAnyElement("thead");
    let tr = createAnyElement("tr");

    for (let k = 3; k < keys.length; k++) {
        let th = createAnyElement("th");
        th.innerHTML = keys[k]+": ";
        // th.setAttribute("style:", "color: #ff0000");
        tr.appendChild(th);
    }
    tHead.appendChild(tr);
    table.appendChild(tHead);
}
function craeteAllTableHeader(keys) {
    let tableId = [ "Food1", "Food2", "Food3", "Food4", "Food5" ];
    for (let i = 0; i < tableId.length; i++) {
        createTableHeader(keys, tableId[i]); 
    }
    
}