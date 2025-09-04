const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoute = require("./routes/authRoutes");
const eventRoute = require("./routes/eventRoutes");
const ticketRoute = require("./routes/ticketRoutes");


const app = express();
const port = process.env.PORT;

app.use(cookieParser());


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.use("/api/auth/", authRoute);
app.use("/api/event/", eventRoute);
app.use("/api/ticket/", ticketRoute);

