const m_user=require('../model/m_user')


module.exports = {
  index: async function (req, res) {
    res.render("master-user/main",{
      semua_user: await m_user.get_semua_user()
    });
  },

  edit:async (req,res)=>{
    let id_usr=req.params.id_usr;
    res.render('master-user/form_edit',
      {
        satu_user:await m_user.get_1_user(id_usr)
      }
    )

  
  }
};
