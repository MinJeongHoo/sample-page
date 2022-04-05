const express = require("express");
const app = express();
const port = 3000;
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.set("view engine", "ejs");
app.set("views", __dirname);
app.engine("html", require("ejs").renderFile);
app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/detail/:capital/:language/:nationality", (req, res) => {
  // console.log(req.params);
  res.render("detail.html", {
    capital: req.params.capital,
    language: req.params.language,
    nationality: req.params.nationality,
  });
});
