const validation=require("express-joi-validations")
const m_produk = require("../model/m_produk");



module.exports = {
  index: async function (req, res) {
    res.render("master-produk/main",
      {
        req:req,
        data_produk:await m_produk.get_semua_produk() 
      }
    );

  },
  form_tambah:async(req,res)=>{
     res.render("master-produk/form-tambah",
      {
        req:req,
      }
    );
  },

  insert:async(req,res)=>{
    try {
      let proses_tambah = await m_produk.insert_1_produk(req);
      if (proses_tambah.affectedRows > 0) {
        res.redirect(
          "/master-produk?succes_msg=berhasil input Produk baru",
        );
      }
    } catch (error) {
      console.log(error);
      res.redirect(
        "/master-produk/create?error_msg=" + error.errorno + ":" + error.sqlMessege,
      );
    }
 },

 detail:async(req,res)=>{
    let id_master_produk=req.params.id_master_produk;
    res.render('master-produk/detail',{
      detail_produk:await m_produk.get_1_produk(id_master_produk)
      }
    )
 },
};
