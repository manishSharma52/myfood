const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./db");

console.log(mongodb);
mongodb();


app.use(( req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));
app.get("/", (req, res) => {
  res.send("hello Worls");
});

app.listen(port, () => {
  console.log(`server is listen ${port}`);
});
