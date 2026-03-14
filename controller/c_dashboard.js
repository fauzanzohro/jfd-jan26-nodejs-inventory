const m_stok_produk = require("../model/m_stok_produk");

module.exports = {
  index: async function (req, res) {
    res.render("dasboard/main",
      {
        req:req,
        stok_terakhir:await m_stok_produk.get_produk_by_kode()
      }
    );
  },
};
