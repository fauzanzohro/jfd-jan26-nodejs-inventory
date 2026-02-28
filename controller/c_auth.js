const bcrypt = require("bcryptjs");
const m_user = require("../model/m_user");
const { proses_tambah } = require("../../nodejs-expres/controller/c_karyawan");

module.exports = {
  form_login: function (req, res) {
    if (req.session.user) {
      res.redirect("/dashboard");
      return;
    }
    res.render("auth/form_login", {
      req: req,
    });
  },

  proses_login: async function (req, res) {
    // res.send(req.body);
    let form_username = req.body.form_username;
    let form_password = req.body.form_password;
    let username_exist = await m_user.get_1_username(form_username);
    if (username_exist.length > 0) {
      // res.send("lanjut");
      let password_db = username_exist[0].password;
      let password_cocok = bcrypt.compareSync(form_password, password_db);
      if (password_cocok) {
        req.session.user = username_exist;
        res.redirect("/dashboard");
      } else {
        res.redirect("/login?msg=Password Salah,Silahkan Hubungi Admin");
      }
      // console.log(username_exist);
    } else {
      res.redirect(
        "/login?msg=username tidak terdaftar,Silahkan Hubungi Admin",
      );
    }
  },
  cek_login: function (req, res, next) {
    //ppilihan 1 code manual simpan user ke req.session
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login?msg=sesi anda telah habis");
    }
    //pakai fungsi bawaaan pasport(lebih scaleable)

    //   console.log("isAuthenticated:", req.isAuthenticated());
    //   console.log("user:", req.user);
    //   console.log("session:", req.session);
    //   if (req.isAuthenticated()) return next();
    //   res.redirect("/login?msg=sesi anda telah habis");
  },

  form_pendaftaran: function (req, res) {
    res.render("auth/form_pendaftaran");
  },

  proses_daftar: async function (req, res) {
    try {
      let form_password = req.body.form_password;
      let form_konfirmasi_password = req.body.form_konfirmasi_password;
      if (form_password !== form_konfirmasi_password) {
        return res.redirect("/form-pendaftaran?msg=password tidak sama");
      }
      //cek dlu username yangsama  jika masih ada tolak jika tidak ada baru di insert
      // let cek_username = await m_user.get_1_username(form_username);
      // if (cek_username.length > 0) {
      //   res.render("/form-pendaftaran?msg=username sudah ada");
      // } else {
      // res.send(hash_password);
      let proses_tambah = await m_user.insert_1_karyawan(
        req,
        // username: req.body.form_username,
        // password: hash_password,
      );
      if (proses_tambah.affectedRows > 0) {
        return res.redirect("/login");
        // }
      }
    } catch (error) {
      console.log(error);

      res.send("gagal");
    }
  },
};
