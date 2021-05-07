const fetch = require("node-fetch");
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");
const { getplante, getdescription } = require("./api");
const btnid = require("./main.js").btnid;
var remote = require("electron").remote;

module.exports.createwindowreglage = function createwindowreglage(
  mainWindowParam
) {
  // Create the browser window.
  const windowreglage = new BrowserWindow({
    parent: mainWindowParam,
    modal: true,
    width: 1200,
    height: 800,
    modal: true,
    frame: false,
    movable: false,
    resizable: false,
  });

  windowreglage.loadFile(path.join(__dirname, "../html/reglage.html"));
};

module.exports.createwindowconsommation = function createwindowconsommation(
  mainWindowParam
) {
  // Create the browser window.
  const windowconsommation = new BrowserWindow({
    parent: mainWindowParam,
    modal: true,
    width: 1200,
    height: 800,
    modal: true,
    frame: false,
    movable: false,
    resizable: false,
  });

  windowconsommation.loadFile(
    path.join(__dirname, "../html/consommation.html")
  );
};

module.exports.createwindowmeteo = function createwindowmeteo(
  mainWindowParam
) {
  // Create the browser window.
  const windowmeteo = new BrowserWindow({
    parent: mainWindowParam,
    modal: true,
    width: 1200,
    height: 800,
    modal: true,
    frame: false,
    movable: false,
    resizable: false,
  });

  windowmeteo.loadFile(
    path.join(__dirname, "../html/meteo.html")
  );
  windowmeteo.webContents.openDevTools();

  windowmeteo.webContents.on("did-finish-load", () => {
    windowmeteo.webContents.send("loadDatameteo");
  });

  // Nulls value after close
  /*windowmeteo.on("closed", function () {
    windowmeteo = null;
  });*/
  

  return windowmeteo;
};

module.exports.createpopupplantation = function createpopupplantation(
  mainWindowParam,
  btnid
) {
  // Create the browser window.
  let windowpopupplantation = new BrowserWindow({
    parent: mainWindowParam,
    modal: true,
    width: 1200,
    height: 800,
    modal: true,
    frame: true,
    movable: false,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  windowpopupplantation.loadFile(
    path.join(__dirname, "../html/plantation.html")
  );

  windowpopupplantation.webContents.on("did-finish-load", () => {
    // Send Message
    // console.log(remote.getGlobal("MyGlobalVariable"));
    windowpopupplantation.webContents.send("idplantation", idplantation);
    getplante(btnid).then((json) => {
      windowpopupplantation.webContents.send("loadData", json);
    });
  });

  windowpopupplantation.webContents.openDevTools();

  // Nulls value after close
  windowpopupplantation.on("closed", function () {
    windowpopupplantation = null;
  });

  return windowpopupplantation;
};

//------------------------------------------------------------------------------------------------------------------

module.exports.createpopupplantationlock = function createpopupplantationlock(
  mainWindowParam,
  btnid,
  idplantation
) {
  // Create the browser window.
  let windowpopupplantationlock = new BrowserWindow({
    parent: mainWindowParam,
    modal: true,
    width: 1200,
    height: 800,
    modal: true,
    frame: true,
    movable: false,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  windowpopupplantationlock.loadFile(
    path.join(__dirname, "../html/plantationlock.html")
  );

  // NE viens JAmais juqu'a did finish load

  windowpopupplantationlock.webContents.on("did-finish-load", () => {
    windowpopupplantationlock.webContents.send("idplantation", idplantation);
    getdescription(btnid).then((json) => {
      windowpopupplantationlock.webContents.send("loadDatalock", json);
    });
  });

  windowpopupplantationlock.webContents.openDevTools();

  // Nulls value after close
  windowpopupplantationlock.on("closed", function () {
    windowpopupplantationlock = null;
  });

  return windowpopupplantationlock;
};

// When the action-update-label event is triggered (from the main process)
// Do something in the view
/*ipcRenderer.on("action-update-label", (event, arg) => {
  // Update the second interface or whatever you need to do
  // for example show an alert ...
  alert("Hello, you did something in the first window !");

  // arg contains the data sent from the first view
  console.log(arg);
});*/

// meteo nina

