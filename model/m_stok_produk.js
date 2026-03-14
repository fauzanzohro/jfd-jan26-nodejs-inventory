const moment    = require('moment')
const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd'
})
db.connect()


module.exports =
{
    get_produk_by_kode: function(req) {
        let sql = mysql.format(
              `SELECT kode, stok_sisa, created_at 
            FROM (
                SELECT DISTINCT kode, stok_sisa, created_at 
                FROM stok_produk ORDER BY created_at DESC
            ) AS dummyTable
            GROUP BY kode;`, 
        )

        return new Promise( function(resolve,reject) {
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

 get_semua_produk_by_kode: function(kode_produk ) {
        let sql = mysql.format(
           `SELECT stok_produk.*,master_produk.nama,user.username
            FROM stok_produk
            JOIN master_produk ON master_produk.kode=stok_produk.kode
            JOIN user ON user.id=stok_produk.created_by
            WHERE stok_produk.kode = ? ORDER BY id ASC;`,[kode_produk] 
        )

        return new Promise( function(resolve,reject) {
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },


    insert_stok_masuk: function(req, stok_terbaru) {
        let sql = mysql.format(
            'INSERT INTO stok_produk SET ?',
            [{
                // kolom_sql: form_html
                kode        : req.body.form_kode_barang,
                stok_masuk  : req.body.form_qty_masuk,
                stok_keluar : 0,
                stok_sisa   : stok_terbaru,
                created_at  : moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by  : req.session.user[0].id
            }]
        )

        return new Promise( function(resolve,reject) {
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },

      insert_stok_keluar: function(req, stok_terbaru) {
        let sql = mysql.format(
            'INSERT INTO stok_produk SET ?',
            [{
                // kolom_sql: form_html
                kode        : req.body.form_kode_barang,
                stok_masuk  : 0,
                stok_keluar : req.body.form_qty_keluar,
                stok_sisa   : stok_terbaru,
                created_at  : moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by  : req.session.user[0].id
            }]
        )

        return new Promise( function(resolve,reject) {
            db.query(sql, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
}