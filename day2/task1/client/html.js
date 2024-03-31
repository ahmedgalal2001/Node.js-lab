let res = new XMLHttpRequest();
let btn_add = document.getElementById("btn-add");
let btn_update = document.getElementById("btn-update");
let table = document.getElementById("customers");

res.addEventListener("load", result);

res.open("GET", "http://localhost:3000/flight/all");

btn_add.onclick = () => {
  res.open("POST", "http://localhost:3000/flight");
  res.send();
  window.location.reload();
}

btn_update.onclick = () => {
  res.open("POST", "http://localhost:3000/flight/update");
  res.send();
  window.location.reload();
}

res.send();

function result() {
  let responseData = JSON.parse(this.responseText);
  responseData.forEach(item => {
    let row = table.insertRow();
    for (const key in item) {
      let cell = row.insertCell();
      cell.textContent = item[key];
    }
  });
}
