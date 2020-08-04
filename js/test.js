let url1 = "../db/burger.json"
let url2 = "http://jupieter.github.io/db/burger.json"
console.log("Kezdet");

// Small library to improve on fetch() usage
const api = function(method, url, data, headers = {}){
  return fetch(url, {
    method: method.toUpperCase(),
    body: JSON.stringify(data),  // send it as stringified json
    credentials: api.credentials,  // to keep the session on the request
    mode: "cors",
    headers: Object.assign({}, api.headers, headers)  // extend the headers
  }).then(res => res.ok ? res.json() : Promise.reject(res));
};
// Convenient methods
['get', 'post', 'put', 'delete'].forEach(method => {
  api[method] = api.bind(null, method);
});

// Defaults that can be globally overwritten
/* api.credentials = 'include';
api.headers = {
  'csrf-token': window.csrf || '',    // only if globally set, otherwise ignored
  'Accept': 'application/json',       // receive json
  'Content-Type': 'application/json'  // send json
}; */


data1 = api.get(url1);
console.log("data1",data1);
data1.then(
  data2 => {
    console.log("data2", data2.keys[1]);
    },
  err => console.error("data2", err)
);

var fs = require('fs');

fs.readFile(url1, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    console.log('File data:', jsonString) 
});

// api.(url1, "ordered");
