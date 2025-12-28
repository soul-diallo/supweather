const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Bodyparser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Routes
const weather = require("./routes/api/weather");
app.use("/api/weather", weather);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));