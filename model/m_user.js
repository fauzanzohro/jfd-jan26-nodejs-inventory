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
  get_semua_user:function () {
   let sql = mysql.format("SELECT * FROM user", [
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

get_semua_role:function () {
   let sql = mysql.format("SELECT role FROM user", [
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
  
  get_1_user:function (id_usr) {
   let sql = mysql.format("SELECT * FROM user WHERE user.id=?", [id_usr]);
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
  edit_1_user:(req)=>{
  let sql = mysql.format("UPDATE karyawan SET ? WHERE id=?", [
        {
          username: req.body.form_nama,
          password: req.body.form_tgl_lahir,
          role: req.body.form_gender,
        },
        req.params.id,
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
}

};
