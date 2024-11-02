const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
const adminroutes = require("./routes/adminroute");
const superadminroutes = require("./routes/superadmin");
const hoteldetails = require("./routes/hotel");
const Fooddetail = require("./routes/Fooditem");
const userdetaiils = require("./routes/user");

const categoryupload = require("./routes/categoryroute");

const app = express();

//Load environment variable
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

if (!CONNECTION) {
  console.log("CONNECTION string is not provided.");
  process.exit(1);
}

//Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

//routes
app.use("/admin", adminroutes);
app.use("/superadmin", superadminroutes);
app.use("/hotel", hoteldetails);
app.use("/food", Fooddetail);
app.use("/user", userdetaiils);
app.use("/category", categoryupload);

app.get("/", (req, res) => {
  res.send("Welcome to Dineease API");
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION, {
      dbName: "dineease",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during connection", error);
    process.exit(1);
  }

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("MongoDB disconnected through app termination");
      process.exit(0);
    });
  });
};

start();
