const mongoose = require("mongoose");
const MenuItem = require("./models/menuItem");

const dbURI =
  "mongodb+srv://aavaris:Norton2024@testcluster.yghusht.mongodb.net/menu?retryWrites=true&w=majority&appName=TestCluster";

mongoose.connect(dbURI);

// create the menu items list
const menuItems = [
  {
    name: "Misto caldo",
    description: "Patatine fritte, panelle, crocchette di patate, arancinette",
    price: 7,
    category: "Antipasti",
    allergens: [],
  },
  {
    name: "Pollo mix",
    description: "Alette di pollo, nuggets di pollo, straccetti di pollo",
    price: 9,
    category: "Antipasti",
    allergens: [],
  },
  {
    name: "Sticks di formaggio",
    description: "Quadratini di formaggio affumicato",
    price: 5,
    category: "Antipasti",
    allergens: ["Latticini"],
  },
  {
    name: "Cheeseburger",
    description: "Hambruger di manzo, cheddar, bacon, ketchup",
    price: 12,
    category: "Burger",
    allergens: ["Glutine"],
  },
  {
    name: "Chickenburger",
    description:
      "Hamburger di pollo fritto, insalata iceberg, bacon, cheddar, salsa yogurt",
    price: 15,
    category: "Burger",
    allergens: ["Glutine"],
  },
  {
    name: "Spicyburger",
    description: "Hamburger di angus, insalata iceberg, cheddar, salsa piccante",
    price: 14,
    category: "Burger",
    allergens: ["Glutine"],
  },
  {
    name: "Margherita",
    description: "Pomodoro, mozzarella, basilico, olio d'oliva",
    price: 7,
    category: "Pizze",
    allergens: ["Latticini", "Glutine"],
  },
  {
    name: "Romana",
    description: "Pomodoro, mozzarella, prosciutto cotto, basilico, olio d'oliva",
    price: 8,
    category: "Pizze",
    allergens: ["Latticini", "Glutine"],
  },
  {
    name: "Pistacchiosa",
    description: "Pesto di pistacchio, scaglie di pistacchio, mortadella, burrata, olio d'oliva",
    price: 12,
    category: "Pizze",
    allergens: ["Latticini", "Glutine"],
  },
  {
    name: "Pasta al ragù",
    description: "Tortellini al ragù di cinghiale",
    price: 15,
    category: "Pasta",
    allergens: [],
  },
  {
    name: "Pasta alla carbonara",
    description: "Spaghetti con crema d'uovo e guanciale",
    price: 17,
    category: "Pasta",
    allergens: ["Uova", "Latticini"],
  },
  {
    name: "Pasta ai frutti di mare",
    description: "Spaghetti con ricci e gamberetti",
    price: 20,
    category: "Pasta",
    allergens: ["Frutti di mare"],
  },
  {
    name: "Tortino al cioccolato",
    description: "Tortino con cuore caldo al cioccolato con contorno di gelato alla vaniglia",
    price: 5,
    category: "Dessert",
    allergens: ["Latticini", "Glutine"],
  },
  {
    name: "Cheesecake",
    description: "Fetta di cheesecake con frutti di bosco",
    price: 5,
    category: "Dessert",
    allergens: ["Latticini", "Glutine"],
  },
  {
    name: "Sorbetto al limone",
    description: "Granita al limone",
    price: 5,
    category: "Dessert",
    allergens: [],
  },
];

// insert the menu items in the database 
mongoose.connection.once("open", () => {
  MenuItem.insertMany(menuItems)
    .then(() => {
      console.log("Menu items inseriti con successo!");
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error("Errore durante l'inserimento dei menu items:", error);
      mongoose.connection.close();
    });
});
