const fetch = require("node-fetch");

//const apiUrl = "http://localhost:8080";
const apiUrl = "http://172.16.78.100:8080";

module.exports.getPlantations = () => {
  // Quand tu ecris ca, JS fait ce qui est ecri en dessous
  return fetch(apiUrl + "/champ/1/plantation/list")
    .then((res) => res.json())
    .then((json) => {
      plante = json;
      return plante;
    });
};

module.exports.getplante = function getdata() {
  // Quand tu ecris ca, JS fait ce qui est ecri en dessous
  return fetch(apiUrl + "/plante/list")
    .then((res) => res.json())
    .then((json) => {
      plante = json;
      return plante;
    });
};

module.exports.getetat = function getdata(id) {
  const idx = id.charAt(0);
  const idy = id.charAt(1);
  console.log(apiUrl + "/champ/1/plantation/list?x=" + idx + "&y=" + idy);
  return fetch(apiUrl + "/champ/1/plantation/list?x=" + idx + "&y=" + idy)
    .then((res) => res.json())
    .then((json) => {
      etatplantation = json;
      return etatplantation;
    });
};

module.exports.getdescription = function getdata(id) {
  const idx = id.charAt(0);
  const idy = id.charAt(1);
  console.log(apiUrl + "/champ/1/plantation/list?x=" + idx + "&y=" + idy);
  return fetch(apiUrl + "/champ/1/plantation/list?x=" + idx + "&y=" + idy)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
/*

JSON = {
  "libre": true,
  "planteId": 0,
  "x": 0,
  "y": 0
}
*/

// Equivalent en JS
let dto = {
  libre: true,
  planteId: 5,
  x: 1,
  y: 1,
};

module.exports.light = function setdata() {
  fetch(apiUrl + "/monitor/actionneurs/lumiere/on", { method: "POST" });
};

module.exports.lightoff = function setdata() {
  fetch(apiUrl + "/monitor/actionneurs/lumiere/off", { method: "POST" });
};

module.exports.mouvA1 = function setdata() {
  fetch(apiUrl + "/monitor/deplacerCase/A1", { method: "POST" });
};
/*
module.exports.planter = (saisie) {
  fetch(apiUrl + "/champ/1/plantation/update", { method: "POST" body:});
};
*/
//------------------------------------------------------ REGLAGE --------------------------------------------

module.exports.getPosRef = () => {
  return fetch(apiUrl + "/reglages/list")
    .then((res) => res.json())
    .then((json) => {
      return posRef;
    });
};

//------------------------------------------------------ CONSO ----------------------------------------------
