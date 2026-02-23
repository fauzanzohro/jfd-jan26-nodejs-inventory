const express = require("express");
const app = express();
const port = 3000;
const c_beranda = require("./controller/c_beranda");

app.use(express.urlencoded({ extended: false })); //untuk post
app.set("view engine", "ejs"); //setting penggunaan template engine
app.set("views", "./view"); // setting penggunaan folder untuk melihat html
app.use(express.static("public"));

app.get("/", c_beranda.index);

app.listen(port, () => {
  console.log(`buka aplikasi di  http://localhost:${port}`);
});
