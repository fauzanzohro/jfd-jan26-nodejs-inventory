const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jfd",
});
db.connect();

module.exports = {
  get_semua_produk: function (form_username) {
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
}