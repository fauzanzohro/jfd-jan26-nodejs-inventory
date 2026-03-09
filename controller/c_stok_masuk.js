const m_produk=require('../model/m_produk')
const m_stok_produk=require('../model/m_stok_masuk')



module.exports={
    index:async function (req,res) {
        res.render('stok_masuk/main',
            {
                req:req,
                dataProduk:await m_produk.get_semua_produk()
            }
        )
    },
    proses_insert:async function (req,res) {
        try {
            // ambil data ke m_produk yg kodenya adalah sama dengan di form
            let stok_terakhir = await m_stok_produk.get_produk_by_kode(req)
            
            // jika ada, maka tambahkan
            let stok_terbaru = req.body.form_qty_masuk
            if (stok_terakhir.length > 0) {
                stok_terbaru = Number(stok_terakhir[0].stok_sisa) + Number(req.body.form_qty_masuk)
            }

            // proses insert ke db
            let proses_insert = await m_stok_produk.insert_stok_masuk(req, stok_terbaru)
            if (proses_insert.affectedRows > 0) {
                res.redirect('/stok-masuk?succes_msg=berhasil input stok masuk untuk produk '+ req.body.form_kode_barang)
            }
        } catch (error) {
            console.log(error);
            let objek_error = ''
            if (error.sqlMessage) {
                objek_error = error.errno +': '+ error.sqlMessage
            } else {
                objek_error = JSON.stringify(error)
            }
            res.redirect('/stok-masuk?error_msg=' + objek_error)
        }
    }
}