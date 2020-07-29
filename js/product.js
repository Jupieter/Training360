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
    let tr = createAnyElement("tr");
    let divR = createAnyElement("div", { class: "row" });

    console.log("keys-length: ", keys.length);
    for (let k = 3; k < keys.length; k++) {
        switch (k) {
            case 3:
                attributes = { class: "col-sm-2" };
                break;
            case 4:
                attributes = { class: "col-sm-1" };
                break;
            case 5:
                attributes = { class: "col-sm-4" };
                break;
            case 6:
                attributes = { class: "col-sm-1" };
                break;
            case 7:
                attributes = { class: "col-sm-3" };
                break;
        }
        let th = createAnyElement("th");
        th.innerHTML = keys[k] + ": ";
        let divH = createAnyElement("div", attributes);
        // th.setAttribute("style:", "color: #ff0000");
        divH.appendChild(th);
        //  tr.appendChild(divH);
        divR.appendChild(divH);
    }
    // tHead.appendChild(divR);
    table.appendChild(divR);
    table.appendChild(tBody);
}

// Create Head & Body
function craeteAllTable(data) {
    keys = Object.keys(data[0]);
    keys.push("buttons");
    // console.log("keys: ", keys);
    for (let i = 0; i < tableId.length; i++) {
        createTableHeader(keys, tableId[i]);
    }

    fillDataTable(data);

}

// Fill table with server data
function fillDataTable(data,) {
    let table = []; let tBody = [];
    let attributes = {};
    for (let i = 0; i < tableId.length; i++) {
        let tableID = tableId[i];
        // console.log(tableID);
        table[i] = document.querySelector(`#${tableID}`);
        if (!table) {
            console.error('Table is not found')
            return;
        }
        tBody[i] = table[i].querySelector("tBody"); // console.log(tBody);
        tBody[i].innerHTML = "";
    }
    /* for (let j = 0; j < 5; j++) {
        console.log("table: ", table[j], "body: ", tBody[j]);

    } */

    let tr = createAnyElement("tr");

    for (let row of data) {
        let dataId = row.id
        // console.log("row: ", row);
        // console.log("Id: ", dataId);

        if (row.active) {
            let bodyIndex = row.foodType
            //console.log(bodyIndex);

            let tr = createAnyElement("tr");
            let divRD = createAnyElement("div", { class: "row" });
            for (let k = 3; k < keys.length - 1; k++) {
                switch (k) {
                    case 3:
                        attributes = { class: "col-sm-2" };
                        break;
                    case 4:
                        attributes = { class: "col-sm-1" };
                        break;
                    case 5:
                        attributes = { class: "col-sm-4" };
                        break;
                    case 6:
                        attributes = { class: "col-sm-1" };
                        break;
                    case 7:
                        attributes = { class: "col-sm-3" };
                        break;
                }
                let element = row[keys[k]];
                let td = createAnyElement("td",)
                td.innerHTML = element;

                if (keys[k] == "foodname") {
                    td.setAttribute("style", "text-size: 24px; bold;");
                };
                if (keys[k] == "action" && element != "") {
                    td.setAttribute("class", "badge badge-secondary");
                };
                let divD = createAnyElement("div", attributes);
                // console.log("divD: ", divD, "element: ",td)

                divD.appendChild(td);
                //tr.appendChild(divD);
                divRD.appendChild(divD);
                // console.log("divR: ", divRD, "element: ",divD)
            }

            let btnGroup = createBtnGroup(dataId);
            divRD.appendChild(btnGroup);
            tBody[bodyIndex].appendChild(divRD);
        }
    }
}

function createBtnGroup(dataId) {
    let group1 = createAnyElement("div", {
        class: "btn btn-group",
        style: "margin: 0px; padding: 0px",
    });
    group1.innerHTML = "";
    //console.log(group1);
    let group2 = createAnyElement("div", {
        class: "btn btn-group",
        style: "margin: 0px; padding: 0px",
    });
    group2.innerHTML = "";

    let minusBtn = createAnyElement("button", {
        id: dataId,
        class: "input-group-btn btn btn-default btn-number",
        datatype: "minus",
        onclick: "setRow(this)",
        style: "margin: 0px"
    });
    minusBtn.innerHTML = '<i class="far fa-minus-square"></i>';

    let input = createAnyElement("input", {
        id: dataId,
        class: "form-control",
        maxlength: "2",
        size: 4,
        value: 0,
        name: dataId,
    });
    
    let plusBtn = createAnyElement("button", {
        id: dataId,
        class: "input-group-btn btn btn-default btn-number",
        datatype: "plus",
        onclick: "addPlusToInput(this)",
        style: "margin: 0px"
    });
    plusBtn.innerHTML = '<i class="far fa-plus-square"></i>';
    // plusBtn.addEventListener("click", addPlusToInput);
    
    let infoBtn = createAnyElement("button", {
        id: dataId,
        class: "btn btn-success",
        onclick: "setRow(this)",
        style: "margin: 0px"
    });
    infoBtn.innerHTML = '<i class="fas fa-shopping-basket"></i>';
    
    let delBtn = createAnyElement("button", {
        id: dataId,
        class: "btn btn-danger",
        onclick: "delRow(this)",
        style: "margin: 0px"
    });
    delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    
    group1.appendChild(minusBtn);
    group1.appendChild(input);
    group1.appendChild(plusBtn);
    group2.appendChild(infoBtn);
    group2.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group1)
    td.appendChild(group2)
    //console.log(td);
    return td;
}
function addPlusToInput(btn){
    let btnId = btn.id;
    let inputs = document.querySelector("input",#${btnId});
    let inputVal = inputs.value 
    console.log("hozzáad: ", btnId, inputVal);
}