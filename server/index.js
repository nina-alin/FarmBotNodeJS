const express = require("express");
const app = express();
const port = 3000;

app.get("/plantes", (req, res) => {
  res.send([
    {
      id: 1,
      name: "Carotte",
    },
    {
      id: 2,
      name: "Patate",
    },
    {
      id: 3,
      name: "Tomate",
    },
  ]);
});

app.get("/11", (req, res) => {
  res.send([
    {
      id: 1,
      name: "",
    },
  ]);
});

app.get("/a2", (req, res) => {
  res.send([
    {
      id: 1,
      name: "1",
    },
  ]);
});

app.get("/patatate", (req, res) => {
  res.send([
    {
      id: 1,
      name: "patatate",
      description:
        "la patatate est un fruite poussant dans l'arbre issu de la reproduction des poulets",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
