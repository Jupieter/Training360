let users = [
    {firstname: "Piros", lastname: "Andras", email: "pa@gmail.com", passw: "1"},
    {firstname: "Sárga", lastname: "Béla", email: "sb@gmail.com", passw: "2"},
    {firstname: "Zöld", lastname: "Cili", email: "zc@gmail.com", passw: "3"},
    {firstname: "Kék", lastname: "Csaba", email: "kcs@gmail.com", passw: "4"},
    {firstname: "Fehér", lastname: "Dani", email: "fd@gmail.com", passw: "5"},
    {firstname: "Fekete", lastname: "Emma", email: "fe@gmail.com", passw: "6"},
];

let tableBody = document.querySelector("#userTable tbody");
let createTD = (html, parent) => {
    let td = document.createElement("td");
    td.innerHTML = html
    parent.appendChild(td)
}
for (let k in users){
    let tr = document.createElement("tr");
    createTD(parseInt(k)+1, tr)
    for (let value of Object.values(users[k])) {
        createTD(value, tr)
    }
    tableBody.appendChild(tr)
}