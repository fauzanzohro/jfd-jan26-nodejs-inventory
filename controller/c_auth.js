const bcrypt = require("bcryptjs");
const m_user = require("../model/m_user");

module.exports = {
  form_login: function (req, res) {
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
    // if (req.session.user) {
    //   next();
    // } else {
    //   res.redirect("/login?msg=sesi anda telah habis");
    // }
    //pakai fungsi bawaaan pasport(lebih scaleable)
    if (req.isAuthenticated()) return next();
    res.redirect("/login?msg=sesi anda telah habis");
  },
};
