let users = [
    { index: 0, firstname: "Jung", lastname: "Péter", email: "jp@gmail.com", passw: "az" },
    { index: 1, firstname: "Piros", lastname: "Andras", email: "pa@gmail.com", passw: "1" },
    { index: 2, firstname: "Sárga", lastname: "Béla", email: "sb@gmail.com", passw: "2" },
    { index: 3, firstname: "Zöld", lastname: "Cili", email: "zc@gmail.com", passw: "3" },
    { index: 4, firstname: "Kék", lastname: "Csaba", email: "kcs@gmail.com", passw: "4" },
    { index: 5, firstname: "Fehér", lastname: "Dani", email: "fd@gmail.com", passw: "5" },
    { index: 6, firstname: "Fekete", lastname: "Emma", email: "fe@gmail.com", passw: "6" },
];
let validCheck = false
let tableBody = document.querySelector("#userTable tbody");
var inputS = document.querySelectorAll("#usersForm input");

let createTD = (html, parent) => {
    let td = document.createElement("td");
    td.innerHTML = html;
    parent.appendChild(td);
};
let createButtonGrooup = (parent, k) => {
    let group = document.createElement("div");
    group.className = "btn-group";

    let btnInfo = document.createElement("button");
    btnInfo.className = "btn-info btn";
    btnInfo.value = k
    btnInfo.innerHTML = '<i class="fas fa-sync-alt"></i>';

    let btnDanger = document.createElement("button");
    btnDanger.className = "btn-danger btn";
    btnDanger.value = k;
    btnDanger.innerHTML = '<i class="fas fa-trash-alt"></i>';
    group.appendChild(btnInfo);
    group.appendChild(btnDanger);

    let td = document.createElement("td");
    parent.appendChild(td);
    td.appendChild(group);

    btnInfo.addEventListener("click", refreshRow);
    btnDanger.addEventListener("click", deleteRow);
};
let clearForm = () => {
    for (let i = 0; i < 4; i++) {
        inputS[i].value = "";
    };
};

function validation() {
    validCheck = false
    var inputS = document.querySelectorAll("#usersForm input");
    //Empty checking
    for (let i = 0; i < inputS.length; i++) {
        const element = inputS[i].value;
        if (element == "") {
            alert("All fields are required!");
            validCheck = false;
            break;
        };
        //email validation
        if (i == 2) {
            let serpent = false;
            let dot = false;
            for (j of element) {
                // console.log("emil", j);
                if (j == "@") { serpent = true }
                if (j == ".") { dot = true }
            }
            if (serpent != true || dot != true) {
                alert("Not valid email adress!");
                validCheck = false;
                break;
            };
        };
        validCheck = true
    };
};
// input users from Form to Array & Table
let readForm = () => {
    validation()
    if (validCheck == true) {

        var nextIndex = 0;
        for (let j = 0; j < users.length; j++) {
            const userIndex = users[j].index;
            if (userIndex > nextIndex) {
                nextIndex = userIndex;
            };
            nextIndex += 1;
            // console.log(userIndex);
        };

        var akku = {
            index: nextIndex,
            firstname: inputS[0].value,
            lastname: inputS[1].value,
            email: inputS[2].value,
            passw: inputS[3].value,
        };
        users.push(akku);
        // console.log("Akku", akku, "Next", nextIndex,);
        // console.log("Users", users[nextIndex]);
        createAllRow();
    };
};

function deleteRow() {
    var actualRow = this.parentNode.parentNode.parentNode
    var i = actualRow.rowIndex - 1;

    // console.log("Delete");
    // console.log(i);
    if (confirm("Are you sure? Can it delete?")) {
        // actualRow.style.backgroundColor = "#ee9090";
        tableBody.deleteRow(i);
        users.splice(i, 1)
    };
};
function loadForm() {
    var actualRow = this;
    var actualRowIndex = actualRow.rowIndex - 1
    if (actualRowIndex > -1) {
        /* var indeX = actualRow.childNodes;
        var arrayNum = (indeX[0].childNodes[0]);
        arrayNum.trim();
        arrayNum = Number(arrayNum)  ; */
        // console.log("load index: ", actualRowIndex);  
        var userData = []
        userData[1] = users[actualRowIndex].firstname;
        userData[2] = users[actualRowIndex].lastname;
        userData[3] = users[actualRowIndex].email;
        userData[4] = users[actualRowIndex].passw;
    
        for (let i = 1; i < 5; i++) {
            inputS[i - 1].value = userData[i]
        };
    }
}

function refreshRow() {
    var actualRow = this.parentNode.parentNode.parentNode
    var index = actualRow.rowIndex - 1;

    var akku2 = {
        index: index,
        firstname: inputS[0].value,
        lastname: inputS[1].value,
        email: inputS[2].value,
        passw: inputS[3].value,
    };
    // console.log("Refresh");
    // console.log(index, akku2);
    if (confirm("Are you sure? Can it refresh?")) {
        users[index] = akku2;
    };
    createAllRow ()
}

let createAllRow = () => {
    tableBody.innerHTML = ""
    for (let k in users) {
        let tr = document.createElement("tr");
        for (let value of Object.values(users[k])) {
            createTD(value, tr);
            tr.addEventListener("click", loadForm)
        }
        createButtonGrooup(tr, k)
        tableBody.appendChild(tr);
    };
};
createAllRow()