let users = [
    { index: 1, firstname: "Piros", lastname: "Andras", email: "pa@gmail.com", passw: "1" },
    { index: 2, firstname: "Sárga", lastname: "Béla", email: "sb@gmail.com", passw: "2" },
    { index: 3, firstname: "Zöld", lastname: "Cili", email: "zc@gmail.com", passw: "3" },
    { index: 4, firstname: "Kék", lastname: "Csaba", email: "kcs@gmail.com", passw: "4" },
    { index: 5, firstname: "Fehér", lastname: "Dani", email: "fd@gmail.com", passw: "5" },
    { index: 6, firstname: "Fekete", lastname: "Emma", email: "fe@gmail.com", passw: "6" },
];

let tableBody = document.querySelector("#userTable tbody");
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

    btnDanger.addEventListener("click", deleteRow);
}

let readForm = () => {
    //Empty checking
    var inputS = document.querySelectorAll("#usersForm input");
    for (let i = 0; i < inputS.length; i++) {
        const element = inputS[i].value;
        console.log(element);
        if (element == "") {
            alert("All fields are required!");
            break;
        };
        //email validation
        if (i == 2) {
            let serpent = false;
            let dot = false;
            for (j of element) {
                console.log("emil", j);
                if (j == "@") { serpent = true }
                if (j == ".") { dot = true }
            }
            if (serpent != true || dot != true) {
                alert("Not valid email adress!");
                break;
            }
        }
    }
    var nextIndex = 0;
    for (let j = 0; j < users.length; j++) {
        const userIndex = users[j].index;
        if (userIndex > nextIndex) {
            nextIndex = userIndex;
        }
        nextIndex += 1
        console.log(userIndex);
    };

    var akku = {
        index: nextIndex,
        firstname: inputS[0].value,
        lastname: inputS[1].value,
        email: inputS[2].value,
        passw: inputS[3].value,
    }
    users.push(akku);


    console.log("Akku", akku, "Next", nextIndex,);
    console.log("Users", users[nextIndex - 1]);

    tableBody.innerHTML = ""
    createAllRow()

};
function deleteRow() {
    var actualRow = this.parentNode.parentNode.parentNode
    var i = actualRow.rowIndex - 1;
    console.log("Delete");
    console.log(i);
    if (confirm("Are you sure? Can it delete?")) {
        actualRow.style.backgroundColor = "#ee9090";
        tableBody.deleteRow(i);
    } else {
        actualRow.style.backgroundColor = "";
    }
};

let createAllRow = () => {
    for (let k in users) {
        let tr = document.createElement("tr");
        for (let value of Object.values(users[k])) {
            createTD(value, tr);
        }
        createButtonGrooup(tr, k)
        tableBody.appendChild(tr);
    };
};
createAllRow()