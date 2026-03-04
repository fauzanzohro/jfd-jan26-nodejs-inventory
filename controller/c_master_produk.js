const m_produk = require("../model/m_produk");
const {body,query,validationResult}=require('express-validator');

let validasi_insertProduk=
[
  body('form_kode_barang')
  .notEmpty().withMessage('kode tidak boleh kosong')
  .isAlphanumeric().withMessage('kode hanya boleh angka dan huruf')
  .isLength({min:3,max:10}).withMessage('kode barang maksimal 5 karakter')
]

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

validasi_insertProduk,

  insert:async(req,res)=>{
    let validasi=validationResult(req);
    if (validasi.errors.length>0) {
      return res.render("master-produk/form-tambah",{
          req:req,
          pesanValidasi:validasi.array()
      }
      )
    }
    
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
        "/master-produk/create?error_msg= gagal mengirim data"+error ,
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

 edit_1_produk:async(req,res)=>{
  let id_master_produk=req.params.id_master_produk;
  res.render("master-produk/form_edit",{
    data_produk: await m_produk.get_1_produk(id_master_produk)
  }
  )
 },

 proses_edit: async (req,res)=>{
try {
      let proses_tambah = await m_produk.edit(req);
      if (proses_tambah.affectedRows > 0) {
        res.redirect("/master-produk?succes_msg=berhasil update produk");
      }
    } catch (error) {
      console.log(error);
      
      res.redirect(
        "/master-produk/edit/?error_msg=" + error.errorno + ":" + error.sqlMessege,
      );
    }
 }
};
