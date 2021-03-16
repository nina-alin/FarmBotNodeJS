const ipc = require("electron").ipcRenderer;
const fetch = require("node-fetch");
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//------------------ etat plantation ----------------------------------------------------------

document.querySelectorAll(".btnPlantation").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Button clicked");
    ipc.send("etatplantation", btn.id);
  });
});

ipc.on("etatplantation", function (event, data) {
  console.log("Data received", data.libre);
  etat = data.libre;
  if (etat != "1") {
    ipc.send("popupplantationlock");
  }
  if (etat == "1") {
    ipc.send("popupplantation");
  }
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

//---------------------------- plantation -------------------------------------------------------------------------
