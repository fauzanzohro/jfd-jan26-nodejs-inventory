const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jfd",
});
db.connect();
module.exports = {
  get_semua_jabatan: function () {
    let sql = mysql.format("SELECT * FROM jabatan");
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
