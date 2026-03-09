const m_user=require('../model/m_user')
const m_jabatan=require('../model/m_jabatan')

module.exports = {
  index: async function (req, res) {
    res.render("master-user/main",{
      semua_user: await m_user.get_semua_user()
    });
  },

  detail:async (req,res)=>{
    let id_usr=req.params.id_usr;
    res.render('master-user/form_detail',
      {
        satu_user:await m_user.get_1_user(id_usr)
      }
    )
  },

  edit:async (req,res)=>{
    let id_usr=req.params.id_usr;
    res.render('master-user/form-edit',
      {
        edit_user:await m_user.get_1_user(id_usr),
        role:await m_user.get_semua_role(),
        jabatan: await m_jabatan.get_semua_jabatan(),
        
      }
    )
  },

  proses_edit:async (req,res)=>{
   try {
    console.log(req.params)
    console.log(req.body)

    let proses_edit=await m_user.edit(req)
      console.log(proses_edit)
    if (proses_edit.affectedRows>0) {
      res.redirect("/master-user")
      
    }
   } catch (error) {
    console.log(error);
     res.send(error)
   }
  },
};
