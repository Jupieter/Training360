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
getServerData(serverUrl3).then(
    data => craeteAllTable(data),
    err => console.error(err)
);

function createTableHeader(keys, tableID) {
    let table = document.querySelector(`#${tableID}`);
    let attributes = {}
    if (!table) {
        console.error('Table is not found')
        return;
    };
    table.innerHTML = ""

    // let tHead = document.querySelector(`thead`)

    let tHead = createAnyElement("thead");
    let tBody = createAnyElement("tbody");
    let tr = createAnyElement("tr" );
    let divR = createAnyElement("div", {class: "row"} );

    for (let k = 3; k < keys.length; k++) {
        switch (k){
            case 3:
                attributes = {class: "col-sm-2"};
                break
            case 4:
                attributes = {class: "col-sm-1"};
                break
            case 5:
                attributes = {class: "col-sm-3"};
                break
            case 6:
                attributes = {class: "col-sm-1"};
                break
        }
        let th = createAnyElement("th");
        th.innerHTML = keys[k] + ": ";
        let divH = createAnyElement("div", attributes );
        // th.setAttribute("style:", "color: #ff0000");
        divH.appendChild(th);
        //  tr.appendChild(divH);
        divR.appendChild(divH);
    }
    // tHead.appendChild(divR);
    table.appendChild(divR);
    table.appendChild(tBody);
}

// Create ALL
function craeteAllTable(data) {
    keys = Object.keys(data[0]);
    for (let i = 0; i < tableId.length; i++) {
        createTableHeader(keys, tableId[i]);
    }

    fillDataTable(data);
    
    console.log("keys: ",keys);
}

// Fill table with server data
function fillDataTable(data, ) {
    let table = []; let tBody = [];
    let attributes ={};
    for (let i = 0; i < tableId.length; i++) {
        let tableID = tableId[i];
        console.log(tableID);
        table[i] = document.querySelector(`#${tableID}`);
        if (!table) {
            console.error('Table is not found')
            return;
        }
        tBody[i] = table[i].querySelector("tBody"); // console.log(tBody);
        tBody[i] .innerHTML = "";
    }
    for (let j = 0; j < 5; j++) {
        console.log("table: ", table[j], "body: ", tBody[j] );
               
    }

    let tr = createAnyElement("tr");

    for (let row of data) {
        // console.log("row: ", row);
        // console.log(row.foodType);
                
        if (row.active) {
            let bodyIndex = row.foodType
            console.log(bodyIndex);

            let tr = createAnyElement("tr");
            for (let k = 3; k < keys.length; k++) {
                switch (k){
                    case 3:
                        attributes = {class: "col-sm-2"};
                        break
                    case 4:
                        attributes = {class: "col-sm-1"};
                        break
                    case 5:
                        attributes = {class: "col-sm-3"};
                        break
                    case 6:
                        attributes = {class: "col-sm-1"};
                        break
                }
                let element = row[keys[k]];
                let td = createAnyElement("td")
                td.innerHTML = element;
                
                if (keys[k] == "foodname") {
                    td.setAttribute("style", "text-size: 18px" );
                };
                if (keys[k] == "action" && element != "") {
                    td.setAttribute("class", "badge badge-secondary" );
                };
                let divD = createAnyElement("div", attributes)

                divD.appendChild(td);
                tr.appendChild(divD);
            }
            let divR = createAnyElement("div", {class: "row"})
            divR.appendChild(divD);

            // let btnGroup = createeBtnGroup();   // console.log(tr);
            // tr.appendChild(btnGroup);
            tBody[bodyIndex].appendChild(divR);
        }
    }

}
