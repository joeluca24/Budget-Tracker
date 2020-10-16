const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
let dburl = "mongodb://localhost/budget";
if(typeof process.env.MONGODB_URI !== 'undefined'){
  dburl = process.env.MONGODB_URI
}
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});