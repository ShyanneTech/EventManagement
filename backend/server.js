const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express();
const port = process.env.PORT;

app.use(cookieParser());


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management System");
});

