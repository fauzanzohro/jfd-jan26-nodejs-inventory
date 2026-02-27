const express = require("express");
const app = express();
const port = 3000;
const passport = require("passport");
const session = require("express-session");
//
const c_beranda = require("./controller/c_beranda");
const c_auth = require("./controller/c_auth");
const cek_login = c_auth.cek_login;
const c_dashboard = require("./controller/c_dashboard");

//setting session untuk login
app.use(
  session({
    secret: "secret", //ini juga apa fungsinya
    resave: true, //ini juga apa fungsinya
    saveUninitialized: false, //ini juga apa fungsinya
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
    },
  }),
);
app.use(passport.initialize()); //cari tau fungsi
app.use(passport.session()); //cari tau fungsi nya

app.use(express.urlencoded({ extended: false })); //untuk post
app.set("view engine", "ejs"); //setting penggunaan template engine
app.set("views", "./view"); // setting penggunaan folder untuk melihat html
app.use(express.static("public"));

app.get("/", c_beranda.index);
app.get("/login", c_auth.form_login);
app.post("/auth/proses-login", c_auth.proses_login);
app.get("/dashboard", cek_login, c_dashboard.index);
app.get("/form-pendaftaran", c_auth.form_pendaftaran);
app.post("/auth/proses-daftar", c_auth.proses_daftar);

app.listen(port, () => {
  console.log(`buka aplikasi di  http://localhost:${port}`);
});
