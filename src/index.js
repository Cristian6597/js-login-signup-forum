const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
const collection = require("./mongodb");
const { request } = require("http");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//renderizza login.hbs
app.get("/", (req, res) => {
  res.render("login");
});

//renderizza signup.hbs

app.get("/signup", (req, res) => {
  res.render("signup");
});

//la route deve essere uguale al login, ricorda che è async

app.post("/login", async (req, res) => {
  try {
    //prende il nome dal user e lo confronta se è uguale con quello nel database
    const check = await collection.findOne({ name: req.body.name });

    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong details");
  }
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);

  res.render("home");
});

app.listen(3000, () => {
  console.log("Server online, /http://localhost:3000/");
});
