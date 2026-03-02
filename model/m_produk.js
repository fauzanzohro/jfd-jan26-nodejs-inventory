const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const { insert } = require("../controller/c_master_produk");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jfd",
});
db.connect();

module.exports = {
  get_semua_produk: function () {
    let sql = mysql.format("SELECT * FROM master_produk ", []);
    return new Promise(function (resolve, reject) {
      db.query(sql, function (errorSql, hasil) {
        if (errorSql) {
          reject(errorSql);
        } else {
          resolve(hasil);
        }
      });
    });
  },
  
  insert_1_produk:function (req) {
    let sql = mysql.format("INSERT INTO master_produk SET?", [
      {
        kode:req.body.form_kode_barang.toUpperCase(),
        nama :req.body.form_nama_barang,
        deskripsi:req.body.form_deskripsi
      }
    ]);
    return new Promise(function (resolve, reject) {
      db.query(sql, function (errorSql, hasil) {
        if (errorSql) {
          reject(errorSql);
        } else {
          resolve(hasil);
        }
      });
    });
  },
    // get_1_user:function (id_master_produk) {
    //  let sql = mysql.format("SELECT * FROM master_produk WHERE master_produk.id=?", [id_master_produk]);
    //  return new Promise(function (resolve, reject) {
    //     db.query(sql, function (errorSql, hasil) {
    //       if (errorSql) {
    //         reject(errorSql);
    //       } else {
    //         resolve(hasil);
    //       }
    //     });
    //   });
    // },
}