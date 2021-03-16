const fetch = require("node-fetch");
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");
const { getplante, getdescription } = require("./api");

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

module.exports.createpopupplantation = function createpopupplantation(
  mainWindowParam
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
    console.log("Child loaded");
    getplante().then((json) => {
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

module.exports.createpopupplantationlock = function createpopupplantationlock(
  mainWindowParam
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
  windowpopupplantationlock.webContents.on("did-finish-load", () => {
    // Send Message
    console.log("Child loaded");
    getdescription().then((json) => {
      console.log("Data fetched popup : ", json);
      console.log(`win = ${windowpopupplantationlock}`);
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
