const fetch = require("node-fetch");

module.exports.getplante = function getdata() {
  console.log("Recuperation des donnees");
  // Quand tu ecris ca, JS fait ce qui est ecri en dessous
  return fetch("http://localhost:8080/plante/list")
    .then((res) => res.json())
    .then((json) => {
      plante = json;
      return plante;
    });
};

module.exports.getetat = function getdata(id) {
  console.log("Recuperation des donnees");
  const idx = id.split("");
  console.log(idx[0]);
  const idy = id.split("");
  console.log(
    "http://localhost:8080/champ/1/plantation/list/" + idx[0] + "/" + idy[1]
  );
  return fetch(
    "http://localhost:8080/champ/1/plantation/list/" + idx[0] + "/" + idy[1]
  )
    .then((res) => res.json())
    .then((json) => {
      etatplantation = json;
      return etatplantation;
    });
};

module.exports.getdescription = function getdata() {
  console.log("Recuperation des donnees");

  return fetch("http://localhost:8080/plante/list")
    .then((res) => res.json())
    .then((json) => {
      description = json;
      return description;
    });
};
