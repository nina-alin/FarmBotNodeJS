const ipc = require("electron").ipcRenderer;
const fetch = require("node-fetch");
const {
  app,
  BrowserWindow,
  ipcMain,
  ipcRenderer,
  remote,
} = require("electron");
const path = require("path");

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

ipc.on("champLoaded", (event, data) => {
  console.log("Json received ", data);

  //function listplant(){
  var container = document.getElementById("casePlantation");

  container.innerHTML = ""; // Vider la liste

  data.forEach((element) => {
    //on va créer ca :
    /*
    <div class="b3">
      <button
        id="23"
        style="width: 150px; height: 150px"
        class="btnPlantation btn btn-outline-light"
      ></button>
    </div>;
*/
    var div = document.createElement("div");
    div.className = `case${element.y}_${element.x}`;
    if (element.plante != null && element.plante.nom) {
      div.classList.add(element.plante.nom);
    }

    var btn = document.createElement("button");
    btn.id = `${element.x}${element.y}`;
    btn.style = "width: 150px; height: 150px";
    btn.className = "btnPlantation btn btn-outline-light";

    btn.addEventListener("click", () => {
      ipc.send("etatplantation", btn.id);
    });

    div.appendChild(btn);

    container.appendChild(div);
  });
});

//---------------------------- menu -------------------------------------------------------------------------

document.querySelectorAll(".menureglage").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Button reglage clicked");
    ipc.send("menureglage");
  });
});

document.querySelectorAll(".menuconsommation").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Button conso clicked");
    ipc.send("menuconsommation");
  });
});

document.querySelectorAll(".menumeteo").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Button meteo clicked");
    ipc.send("menumeteo");
  });
});

document.getElementById("light").addEventListener("click", () => {
  ipc.send("lightToggle");
});

document.getElementById("lightOff").addEventListener("click", () => {
  ipc.send("lightToggleOff");
});

//---------------------------- plantation -------------------------------------------------------------------------

// ---------------------------- notification --------------------------------------------------

const myNotification = new Notification('Arrosage', {
  body: 'Un arrosage est en cours !'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}