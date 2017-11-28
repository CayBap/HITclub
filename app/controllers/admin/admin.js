const express = require("express");
const admin_md = require("../../models/user");
const student_md = require("../../models/studentM");
router = express.Router();
router.use('/',require(__dirname+'/studentC'));
router.use('/',require(__dirname+'/questionC'));
router.get("/", (req, res) => {
  res.send('Trang chu admin');
});
//load login wit
router.get("/login", (req, res) => {
  res.render("admin/login", { data: {} });
});
router.post("/login", (req, res) => {
  let params = req.body;
  if(params.userName.trim().length==0){
    res.render("admin/login",{data:{error:"Input User and Password."}});
  }
  else{
    let data = admin_md.getUserByUserName(params.userName);
    if(data){
      data.then(function(users){
        
        var status = users.passWord ==params.password;
        if(status){
          req.session.users = users;
          res.redirect("/admin/");
        }
        else{
          res.render("admin/login",{data:{error:"Password is wrong."}});
        }
      })
      .catch(function(){
        res.render("admin/login",{data:{error:"User is not exists."}});
      })
    }
  }
});
//End login acc admin 

module.exports = router;