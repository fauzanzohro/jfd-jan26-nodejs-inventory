const express = require("express");
const app = express();
const port = 3000;
const passport = require("passport");
const session = require("express-session");
const fileUpload =require('express-fileupload')
// const fileUpload=require('express-fileupload')
//
const c_beranda = require("./controller/c_beranda");
const c_auth = require("./controller/c_auth");
const cek_login = c_auth.cek_login;
const c_dashboard = require("./controller/c_dashboard");
const c_master_produk = require("./controller/c_master_produk");
const c_master_user = require("./controller/c_master_user");
const c_stok_masuk = require("./controller/c_stok_masuk");
const c_stok_keluar     = require('./controller/c_stok_keluar')




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
app.use(fileUpload())

app.use(express.urlencoded({ extended: false })); //untuk post
app.set("view engine", "ejs"); //setting penggunaan template engine
app.set("views", "./view"); // setting penggunaan folder untuk melihat html
app.use(express.static("public"));

app.get("/", c_beranda.index);
app.get("/login", c_auth.form_login);
app.post("/auth/proses-login", c_auth.proses_login);
app.get("/dashboard", cek_login, c_dashboard.index);
app.get("/form-pendaftaran", c_auth.form_pendaftaran);
app.post("/auth/proses-daftar",c_auth.validasiUser, c_auth.proses_daftar);

app.get("/master-user", cek_login, c_master_user.index);
app.get('/master-user/detail/:id_usr',cek_login,c_master_user.detail )
app.get('/master-user/edit/:id_usr',cek_login,c_master_user.edit)
app.post('/master-user/proses-edit/:id_usr',cek_login,c_master_user.proses_edit)

app.get("/master-produk", cek_login, c_master_produk.index);
app.get("/master-produk/create", cek_login, c_master_produk.form_tambah);
app.post("/master-produk/insert", cek_login,c_master_produk.validasi_insertProduk,c_master_produk.insert);
app.get("/master-produk/details/:id_master_produk", cek_login, c_master_produk.detail);
app.get("/master-produk/edit/:id_master_produk", cek_login, c_master_produk.edit_1_produk);
app.post("/master-produk/proses-edit/:id_master_produk", cek_login, c_master_produk.proses_edit);

app.get("/stok-masuk", cek_login, c_stok_masuk.index);
app.post("/stok-masuk/proses-insert", cek_login,c_stok_masuk.validasiInput, c_stok_masuk.proses_insert);

app.get("/stok-keluar", cek_login, c_stok_keluar.index);
app.post("/stok-keluar/proses-insert", cek_login,c_stok_keluar.validasiInput, c_stok_keluar.proses_insert);



app.listen(port, () => {
  console.log(`buka aplikasi di  http://localhost:${port}`);
});
