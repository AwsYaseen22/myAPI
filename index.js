const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
require("./dotenv");

const app = express();

// read data from frontend form
app.use(bodyParser.urlencoded({ extended: true }));
// to take the data from the body of raw json on postman
app.use(bodyParser.json());
app.use(cors());

// connect to the DB
const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.DB_URL;
const dbName = "house-consumed-stuff";

let db;
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`connected to ${dbName} DB`);
    db = client.db(dbName);
  })
  .catch((err) => console.log(err));

// Routes
// Main page (containing documentation)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ###################### Items Collection ######################
// List all items
app.get("/api/items", (req, res) => {
  db.collection("items")
    .find()
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

// Get specific item by name
app.get("/api/items/:name", (req, res) => {
  const itemName = req.params.name;
  db.collection("items")
    .find({ name: itemName })
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

// Add item to the itms list
app.post("/api/items", (req, res) => {
  console.log(req.body);
  db.collection("categories")
    .find()
    .toArray()
    .then((result) => {
      let categoriesList = result.map((cat) => cat.name);
      if (categoriesList.includes(req.body.category)) {
        db.collection("items")
          .find()
          .toArray()
          .then((allItems) => {
            let itemsAll = allItems.map((e) => e.name);
            if (!itemsAll.includes(req.body.name)) {
              db.collection("items")
                .insertOne(req.body)
                .then((result) => {
                  res.json(result);
                })
                .catch((err) => console.log(err));
            } else {
              res.send("Item already listed!");
            }
          });
      } else {
        res.send(
          "Please check the category name or add new category if needed!"
        );
      }
    });
});

// ###################### Categories Collection ######################
// List all categories
app.get("/api/categories", (req, res) => {
  db.collection("categories")
    .find()
    .toArray()
    .then((categories) => res.json(categories));
});

// List all items filtered by category:
app.get("/api/items-by-category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  db.collection("items")
    .find({ category: category })
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

// Add new category
app.post("/api/categories", (req, res) => {
  console.log(req.body);
  db.collection("categories")
    .find()
    .toArray()
    .then((result) => {
      let allCategories = result.map((e) => e.name);
      if (!allCategories.includes(req.body.name)) {
        db.collection("categories")
          .insertOne(req.body)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => console.log(err));
      } else {
        res.send(
          "Please double check the category name as it is already listed!"
        );
      }
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
// to handle data from frontend form via req.body

// // using the secrets environment variable
// console.log(process.env.SECRET);

// let categories = ["pantry", "refrigerator", "freezer", "spices and condiments"];
// let items = [
//   { id: 1, category: categories[0], name: "rice" },
//   { id: 2, category: categories[0], name: "pasta" },
//   { id: 3, category: categories[0], name: "spaghetti" },
//   { id: 4, category: categories[0], name: "beans canned" },
//   { id: 5, category: categories[0], name: "lentils" },
//   { id: 6, category: categories[0], name: "bread" },
//   { id: 7, category: categories[1], name: "milk" },
//   { id: 8, category: categories[1], name: "juice" },
//   { id: 9, category: categories[1], name: "eggs" },
//   { id: 10, category: categories[1], name: "butter" },
//   { id: 11, category: categories[1], name: "cheese" },
//   { id: 12, category: categories[1], name: "tortilla" },
//   { id: 13, category: categories[2], name: "meat" },
//   { id: 14, category: categories[2], name: "chicken breast" },
//   { id: 15, category: categories[2], name: "ice cream" },
//   { id: 16, category: categories[3], name: "salt" },
//   { id: 17, category: categories[3], name: "black pepper" },
//   { id: 18, category: categories[3], name: "ketchup" },
//   { id: 19, category: categories[3], name: "mayonnaise" },
//   { id: 20, category: categories[3], name: "mustard" },
//   { id: 21, category: categories[3], name: "hot sauce" },
//   { id: 22, category: categories[3], name: "honey" },
// ];
