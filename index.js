const port = 7100;
const express = require("express");
const app = express();
const router = require("./route");
const expressLayouts = require("express-ejs-layouts");
const { connectToDatabase } = require("./config/mongodb");

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files Middleware
app.use(express.static("./assets"));

// Express EJS Layouts Middleware
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Router Middleware
app.use("/", router);

// EJS View Engine Configuration
app.set("view engine", "ejs");
app.set("views", "./views");

// Establish MongoDB connection before starting the server
connectToDatabase()
  .then(() => {
    // Start the server
    app.listen(port, (err) => {
      if (err) {
        console.log(`Error is running on server: ${err}`);
        return;
      }
      console.log(
        "{Shree Ganeshay Namah} Server is up and running at port " + port
      );
    });
  })
  .catch((error) => {
    console.error("Failed to establish MongoDB Atlas connection:", error);
  });
