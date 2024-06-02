const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MenuItemModel = require("./models/menuItem");

const app = express();

const dbURI =
  "mongodb+srv://<username>:<password>@testcluster.yghusht.mongodb.net/<collectionName>?retryWrites=true&w=majority&appName=<clusterName>";

// Connect the database and start the server
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Middleware and static files
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "mysecret", // A secret string to sign the session's cookies
    resave: false, // Avoid saving the session if it was not modified
    saveUninitialized: true, // Save an uninitialized session
  })
);

// Setting variables for modifiers
app.use((req, res, next) => {
  res.locals.success = req.session.success;
  delete req.session.success;
  next();
});

// Setting "/menu" as the main directory
app.get("/", (req, res) => {
  res.redirect("/menu");
});

// Get the menu items from the database
app.get("/menu", (req, res) => {
  const cartCount = req.session.cart ? req.session.cart.length : 0;

  MenuItemModel.find()
    .then((result) => res.render("index", { menuItems: result, cartCount }))
    .catch((err) => console.log(err));
});

// Details page for each menu item
app.get("/menu/:id", (req, res) => {
  const id = req.params.id;

  MenuItemModel.findById(id)
    .then((result) => res.render("details", { menuItem: result }))
    .catch((err) => console.log(err));
});

// Add an item to the cart
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

// View the cart
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render("cart", { cart, total });
});

// Confirm the order
app.post("/cart/confirm", (req, res) => {
  req.session.cart = [];
  req.session.success = "Ordine effettuato con successo";
  res.redirect("/menu");
});

// Page not found error
app.use((req, res) => {
  res.status(404).render("404");
})
