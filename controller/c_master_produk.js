const m_produk = require("../model/m_produk");
const {body,query,validationResult}=require('express-validator');
const moment=require ('moment')
const path =require ('path')
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
            console.log(req.body);
            console.log(req.files);
            let foto = req.files.form_upload_foto
            let filename = ''
            if (foto) {
                // ganti nama file asli
                let kode_barang     = req.body.form_kode_barang
                let datetime        = moment().format('YYMMDD_HHmmss')
                let extension_name  = path.extname(foto.name)
                filename            = kode_barang + '-' + datetime + extension_name
                let folder_simpan   = path.join(__dirname, '../public/upload-image', filename)

                // pakai function mv() untuk meletakkan file di suatu folder/direktori
                foto.mv(folder_simpan, async function(errorUpload) {
                    // jika upload gagal
                    if (errorUpload) {
                        return res.status(500).send(errorUpload)
                    }
                })
            }
      let proses_tambah = await m_produk.insert_1_produk(req,filename);
      if (proses_tambah.affectedRows > 0) {
        res.redirect(
          "/master-produk?succes_msg=berhasil input Produk baru",
        );
      }
    } catch (error) {
      // console.log(error);
      // console.log(req.body)
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
   let foto = req.files.form_upload_foto
            let filename = ''
            if (foto) {
                // ganti nama file asli
                let kode_barang     = req.body.form_kode_barang
                let datetime        = moment().format('YYMMDD_HHmmss')
                let extension_name  = path.extname(foto.name)
                filename            = kode_barang + '-' + datetime + extension_name
                let folder_simpan   = path.join(__dirname, '../public/upload-image', filename)

                // pakai function mv() untuk meletakkan file di suatu folder/direktori
                foto.mv(folder_simpan, async function(errorUpload) {
                    // jika upload gagal
                    if (errorUpload) {
                        return res.status(500).send(errorUpload)
                    }
                })
            }
      let proses_tambah = await m_produk.edit(req,filename);
      if (proses_tambah.affectedRows > 0) {
        res.redirect("/master-produk?succes_msg=berhasil update produk");
      }
    } catch (error) {
      console.log(error);
      
      res.redirect(
        "/master-produk/edit/?error_msg=" + error.errorno + ":" + error.sqlMessege,
      );
    }
 },

 hapus:async(req,res)=>{
  let id_master_produk=req.params.id_master_produk;
  let proses_hapus=await m_produk.hapus(id_master_produk);
  if (proses_hapus.affectedRows>0) {
    res.redirect("/master-produk");
  }
 }, 
};
