// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = require("./models");
db.sequelize.sync().then(() => {
  console.log("✅ Synced with MySQL");
});

app.get("/", (req, res) => {
  res.send("📚 Welcome to the Library API!");
});

app.use("/api/books", require("./routes/book.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
 