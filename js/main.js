// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");
const getplante = require("./api").getplante;
const getetatplantation = require("./api").getetatplantation;
const getPlantations = require("./api").getPlantations;
const light = require("./api").light;
const getHumidity = require("./meteoapi").getHumidity;

const lightoff = require("./api").lightoff;
const createwindowreglage = require("./childwindow").createwindowreglage;
const createwindowconsommation = require("./childwindow")
  .createwindowconsommation;
  const createwindowmeteo= require("./childwindow")
  .createwindowmeteo;
const createpopupplantation = require("./childwindow").createpopupplantation;
const createpopupplantationlock = require("./childwindow")
  .createpopupplantationlock;
const getetat = require("./api").getetat;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    movable: true,
    icon: "./images/iconefarm.ico",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "../html/index.html"));
  // mainWindow.webContents.openDevTools(); // POUR LE TRUC QUI FAIT CHIER

  mainWindow.webContents.on("did-finish-load", (event) => {
    console.log("Loaded main window");
    // On charge toutes les données et on envoi le tout au renderer
    getPlantations().then((json) => {
      console.log("Json received ", json);
      mainWindow.webContents.send("champLoaded", json);

      //console.log("Json received "+json+" pour le champ "+champId);
      //console.log(`Json received ${json} pour le champ ${champId}`);
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

//------------------------------------------------------------------  PLANTATION  --------------------------------------------------------------

ipcMain.on("etatplantation", (event, id) => {
  getetat(id).then((data) => {
    //console.log("Data received", data);
    //On recupere l'identifiant de la plantation
    // Vérifier que size == 1
    let status = data[0]; // On récupère le premier element car il ne doit y en avoir qu'un seul
    plante = status.plante;
    idplantation = status.id;
    console.log("id plantation = " + idplantation);
    console.log("etat case : ", status);
    if (status.plante !== null) {
      createpopupplantationlock(mainWindow, id, idplantation);
      // let win = createpopupplantation(mainWindow, id);
    } else {
      let win = createpopupplantation(mainWindow, id, idplantation);
      win.on("closed", () => {});
    }
  });
});

//-------------------------------------------------MENU ----------------------------------------------------

ipcMain.on("menureglage", (event, id) => {
  // ... faire des actions au nom du moteur de rendu
  console.log("reglageclick");
  createwindowreglage(mainWindow);
});

ipcMain.on("menuconsommation", (event, id) => {
  console.log("consoclick");
  createwindowconsommation(mainWindow);
});

ipcMain.on("menumeteo", (event, id) => {
  console.log("meteoclick");
  createwindowmeteo(mainWindow);
});

ipcMain.on("lightToggle", (event) => {
  light();
});

ipcMain.on("lightToggleOff", (event) => {
  lightoff();
});

// Je dois gérer la première update en api ... Voir childrenderer.js en 70
