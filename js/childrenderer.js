const { BrowserWindow, ipcRenderer } = require("electron");
const path = require("path");

console.log("Loading child renderer");

ipcRenderer.on("loadData", function (event, data) {
  //function listplant(){
  console.log("Data received Ochnoe", data);
  var container = document.getElementById("#plantsList");
  console.log(container);

  container.innerHTML = ""; // Vider la liste

  data.forEach((element) => {
    //on va créer ca : <li class="plant">Salade</li>
    var li = document.createElement("li");
    li.innerHTML = element.nom;
    li.className = "plant";

    li.id = "plants_" + element.id;
    container.appendChild(li);
  });
});

ipcRenderer.on("loadDatalock", function (event, data) {
  var container = document.getElementById("modal2");
  data.forEach((element) => {
    //on va créer ca : <li class="plant">Salade</li>
    var li = document.createElement("li");
    li.innerHTML = element.description;
    li.className = "description";
    li.id = "description" + element.id;
    container.appendChild(li);
  });

  /*
  data.forEach((element) => {
    var p = document.createElement("p");
    p.innerHTML = element.description;
    p.className = "description";
    p.id = "description";
    ocntainer.appendChild(p);
  });*/
});
