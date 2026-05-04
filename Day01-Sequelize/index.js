const express = require("express");
const path = require("path");
require("dotenv").config();

const db = require("./models/index");
const app = express();
const viewEngine = require("./config/viewEngine")
const homeRoutes  = require("./routes/index.route")




const PORT = process.env.PORT || 3000;
viewEngine(app);
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
const startServer = async () => {
  try {

    await db.sequelize.authenticate();
    console.log("Connect database successful!");
    homeRoutes(app);
    app.listen(PORT, () => {
      console.log(`App is listening on: ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
startServer();