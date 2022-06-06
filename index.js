const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
require("./dotenv");

const app = express();
// to handle data from frontend form via req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// using the secrets environment variable
console.log(process.env.SECRET);

let categories = ["Pantry", "Refrigerator", "Freezer", "Spices and Condiments"];
let items = [
  { id: 1, category: categories[0], name: "rice" },
  { id: 2, category: categories[0], name: "pasta" },
  { id: 3, category: categories[0], name: "spaghetti" },
  { id: 4, category: categories[0], name: "beans canned" },
  { id: 5, category: categories[0], name: "lentils" },
  { id: 6, category: categories[0], name: "bread" },
  { id: 7, category: categories[1], name: "milk" },
  { id: 8, category: categories[1], name: "juice" },
  { id: 9, category: categories[1], name: "eggs" },
  { id: 10, category: categories[1], name: "butter" },
  { id: 11, category: categories[1], name: "cheese" },
  { id: 12, category: categories[1], name: "tortilla" },
  { id: 13, category: categories[2], name: "meat" },
  { id: 14, category: categories[2], name: "chicken breast" },
  { id: 15, category: categories[2], name: "ice cream" },
  { id: 16, category: categories[3], name: "salt" },
  { id: 17, category: categories[3], name: "black pepper" },
  { id: 18, category: categories[3], name: "ketchup" },
  { id: 19, category: categories[3], name: "mayonnaise" },
  { id: 20, category: categories[3], name: "mustard" },
  { id: 21, category: categories[3], name: "hot sauce" },
  { id: 22, category: categories[3], name: "honey" },
];

app.get("/api", (req, res) => {
  res.json(items);
});

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
