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
  get_1_username: function (form_username) {
    let sql = mysql.format("SELECT * FROM user where username=?", [
      form_username,
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

  insert_1_karyawan: function (req) {
    const saltedRound = 10;
    let form_password = req.body.form_password;
    let hash_password = bcrypt.hashSync(form_password, saltedRound);
    let sql = mysql.format("INSERT INTO user SET ?", [
      {
        username: req.body.form_username,
        password: hash_password,
      },
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
};
