const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MenuItemModel = require("./models/menuItem");

const app = express();

const dbURI =
  "mongodb+srv://aavaris:Norton2024@testcluster.yghusht.mongodb.net/menu?retryWrites=true&w=majority&appName=TestCluster";

// connect the database and start the server
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// middleware and static files
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "mysecret", // Una stringa segreta per firmare il cookie della sessione
    resave: false, // Evita di salvare la sessione se non è stata modificata
    saveUninitialized: true, // Salva una sessione non inizializzata
  })
);

// Impostazione variabili locali per le notifiche
app.use((req, res, next) => {
  res.locals.success = req.session.success;
  delete req.session.success;
  next();
});

// setting "/menu" as the main directory
app.get("/", (req, res) => {
  res.redirect("/menu");
});

// get the menu items from the database
app.get("/menu", (req, res) => {
  const cartCount = req.session.cart ? req.session.cart.length : 0;

  MenuItemModel.find()
    .then((result) => res.render("index", { menuItems: result, cartCount }))
    .catch((err) => console.log(err));
});

// details page for each menu item
app.get("/menu/:id", (req, res) => {
  const id = req.params.id;

  MenuItemModel.findById(id)
    .then((result) => res.render("details", { menuItem: result }))
    .catch((err) => console.log(err));
});

// Aggiungi un articolo al carrello
app.post("/cart/add/:id", (req, res) => {
  const itemId = req.params.id;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  MenuItemModel.findById(itemId)
    .then((menuItem) => {
      if (menuItem) {
        req.session.cart.push(menuItem);
      }
      res.redirect("/menu");
    })
    .catch((err) => console.log(err));
});

// Visualizza il carrello
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render("cart", { cart, total });
});

// Conferma l'ordine
app.post("/cart/confirm", (req, res) => {
  req.session.cart = [];
  req.session.success = "Ordine effettuato con successo";
  res.redirect("/menu");
});
