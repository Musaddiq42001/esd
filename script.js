//const api_url = "<heroku_app_url>"
const api_url = "https://promusa.herokuapp.com/user"
function loadData(records = []) {
var table_data = "";
for(let i=0; i<records.length; i++) {
table_data += `<tr>`;
table_data += `<td>${records[i].teacherid}</td>`;
table_data += `<td>${records[i].name}</td>`;
table_data += `<td>${records[i].dept}</td>`;
table_data += `<td>`;
table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
table_data += '&nbsp;&nbsp;';
table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
table_data += `</td>`;
table_data += `</tr>`;
}
//console.log(table_data);
document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
fetch(api_url)
.then((response) => response.json())
.then((data) => {
console.table(data);
loadData(data);
});
}
function getDataById(id) {
fetch(`${api_url}/${id}`)
.then((response) => response.json())
.then((data) => {
console.log(data);
document.getElementById("id").value = data._id;
document.getElementById("teacherid").value = data.teacherid;
document.getElementById("name").value = data.name;
document.getElementById("dept").value = data.dept;
})
}
function postData() {
var teacherid = document.getElementById("teacherid").value;
var name = document.getElementById("name").value;
var dept = document.getElementById("dept").value;
data = {teacherid: teacherid, name: name, dept: dept};
fetch(api_url, {
method: "POST",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.href = "index.html";
})
}
function putData() {
var _id = document.getElementById("id").value;
var teacherid = document.getElementById("teacherid").value;
var name = document.getElementById("name").value;
var dept = document.getElementById("dept").value;
data = {_id: _id, teacherid: teacherid, name: name, dept: dept};
fetch(api_url, {
method: "PUT",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.table(data);
window.location.href = "index.html";
})
}
function deleteData(id) {
user_input = confirm("Are you sure you want to delete this record?");
if(user_input) {
fetch(api_url, {
method: "DELETE",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify({"_id": id})
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.reload();
})
}
}