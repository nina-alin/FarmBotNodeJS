// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const path = require("path");

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
  mainWindow.webContents.openDevTools();
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

//-------------------------------------------------------------------------------------------------------------------

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const getplante = require("./api").getplante;
const getetatplantation = require("./api").getetatplantation;
const createwindowreglage = require("./childwindow").createwindowreglage;
const createwindowconsommation = require("./childwindow")
  .createwindowconsommation;
const createpopupplantation = require("./childwindow").createpopupplantation;
const createpopupplantationlock = require("./childwindow")
  .createpopupplantationlock;
const getetat = require("./api").getetat;
//------------------------------------------------------------------  PLANTATION  --------------------------------------------------------------
ipcMain.on("etatplantation", (event, id) => {
  getetat(id).then((json) => {
    event.sender.send("etatplantation", etatplantation);
  });
});

ipcMain.on("popupplantation", (event, id) => {
  let win = createpopupplantation();
  win.on("closed", () => {
    console.log("popup closed");
  });
});

ipcMain.on("popupplantationlock", (event, id) => {
  createpopupplantationlock(mainWindow);
  /*
  win.on("closed", () => {
    console.log("popup closed");
  });*/
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
