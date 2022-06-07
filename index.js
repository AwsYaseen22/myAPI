const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const { json } = require("express/lib/response");
const PORT = process.env.PORT || 8000;
require("./dotenv");

const app = express();

// connect to the DB
const MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.DB_URL;
// read data from frontend form
app.use(bodyParser.urlencoded({ extended: true }));
// to take the data from the body of raw json on postman
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(connectionString)
  .then((client) => {
    console.log("connected to db");
    const db = client.db("house-consumed-stuff");
    const categories = db.collection("categories");
    const items = db.collection("items");

    // Routes
    app.get("/api", (req, res) => {
      // res.json(items);
      items
        .find()
        .toArray()
        .then((result) => {
          db.listCollections()
            .toArray()
            .then((data) => console.log(data));
          res.json(result);
        })
        .catch((err) => console.log(err));
    });

    app.get("/api/categories", (req, res) => {
      categories
        .find()
        .toArray()
        .then((collections) => res.json(collections));
    });

    app.post("/api/categories", (req, res) => {
      console.log(req.body);
      categories
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((err) => console.log(err));
    });

    // app.get("/api/items-by-category/:category", (req, res) => {
    //   const cat = req.params.category.toLowerCase();
    //   const filtered = items.filter((e) => e.category === cat);
    //   if (filtered.length > 0) {
    //     res.json(filtered);
    //   } else {
    //     res.status(404).end("Please check the requested category name...");
    //   }
    // });

    // app.get("/", (req, res) => {
    //   res.sendFile(__dirname + "/index.html");
    // });

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
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
