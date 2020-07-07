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
    td.innerHTML = html;
    parent.appendChild(td);
};
let createButtonGrooup = parent => {
    let group = document.createElement("div");
    group.className = "btn-group";
    
    let btnInfo = document.createElement("button");
    btnInfo.className = "btn-info btn";
    btnInfo.innerHTML = '<i class="fas fa-sync-alt"></i>';
    
    let btnDanger = document.createElement("button");
    btnDanger.className = "btn-danger btn";
    btnDanger.innerHTML = '<i class="fas fa-trash-alt"></i>';
    group.appendChild(btnInfo);
    group.appendChild(btnDanger);
    
    let td = document.createElement("td");
    td.appendChild(group);
    parent.appendChild(td);
}



for (let k in users){
    let tr = document.createElement("tr");
    createTD(parseInt(k)+1, tr)
    for (let value of Object.values(users[k])) {
        createTD(value, tr);
    }
    createButtonGrooup(tr)
    tableBody.appendChild(tr);
}
