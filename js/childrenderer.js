const { BrowserWindow, ipcRenderer, TouchBarLabel } = require("electron");
const path = require("path");
const mouvA1 = require("./api").mouvA1;
const getHumidity = require("./meteoapi").getHumidity

ipcRenderer.on("loadData", function (event, data) {
  //function listplant(){
  var container = document.getElementById("plantsList");

  container.innerHTML = ""; // Vider la liste

  data.forEach((element) => {
    /*
    var li = $("<li/>")
      .addClass("ui-menu-item")
      .attr("role", "menuitem")
      .appendTo(element);

    var input = $("<input/>")
      .addClass("ui-all")
      .attr("type", "checkbox")
      .appendTo(li);

    var aaa = $("<a/>").addClass("ui-all").text(element).appendTo(li);
    */
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
    descriplante = element.plante;
    descri = descriplante.description;

    console.log("descri plante : ", descri);
    var li = document.createElement("li");
    li.innerHTML = descri;
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
var idplantation;

ipcRenderer.on("idplantation", function (event, data) {
  idplantation = data;
  console.log("idplantation child renderer :" + idplantation);
});

document.getElementById("boutonpop").addEventListener("click", () => {
  mouvA1();
  controle();
});

function controle() {
  var saisie = document.getElementById("choixplante").value;
  alert("vous avez planter : " + saisie + idplantation);

  ipcRenderer.send("planter");
}

/*---------------------- METEO (Nina) ----------------*/

ipcRenderer.on("loadDatameteo", function (event, data) {
  var container = document.getElementById("afficherHumidite");
  data.forEach((element) => {
    descrihumidite = element.data;
    descri = descrihumidite.humidity;

    console.log("descri plante : ", descri);
    var h3 = document.createElement("h3");
    h3.innerHTML = descri;
    h3.className = "description";
    h3.id = "description" + element.id;
    container.appendChild(h3);
  })});