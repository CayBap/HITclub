
const express = require('express');
var router = express.Router();
const student_md = require("../../models/studentM");


router.get('/addStudent',function(req,res){
    res.render('admin/addStudent',{data:{}});
  });
  router.post('/addStudent',function(req,res){
    let params = req.body;
    if(params){
      if(params.name.trim().length == ""||params.phoneNumber==""||params.class.trim().length ==""||params.idStudent==""){
        res.render('admin/addStudent',{data:{error:'Thiếu thông tin'}});
      }
      else{
        var now = new Date();
        params.createdAt = now;
        params.updatedAt = now;
        params.score = '';
        params.password = params.phoneNumber;
        params.age ='';
        //console.log(params);
        let data = student_md.addStudent(params);
        //console.log(params);
        data.then(function(result){
            res.redirect('/admin/student/1');
        }).catch(function(err){
          res.render('admin/addStudent',{data:{error:'Lỗi thêm sinh viên'}});
        });
      };
      }
  });
  router.get('/student/edit/:id',function(req,res){
    let id = req.params.id;
    if(id){
      let data = student_md.getStudentById(id);
      if(data){
        data.then(function(student){
          //console.log(student);
          res.render('admin/editStudent',{data:student});
        })
        .catch(function(){
          res.render("admin/editStudent",{data:{error:"Data is not exists."}});
        });
      }
    }
  });
  router.put('/student/edit',function(req,res){
    var params = req.body;
   // console.log(params);
    data = student_md.updateStudent(params);
    if(!data){
      res.json({status_code:500});
    }
    else{
      data.then(function(result){
        res.json({status_code:200});
      }).catch(function(err){
        res.json({status_code:500});
      });
    }
  });
  router.delete('/student/delete',function(req,res){
    var student_id = req.body.id;
    //console.log("id"+student_id);
    var data = student_md.deleteStudent(student_id);
  
    if(!data){
      res.json({status_code:500});
    }
    else{
      data.then(function(result){
        res.json({status_code:200});
      }).catch(function(err){
        res.json({status_code:500});
      });
    }
  });
  router.get('/student/:page', function(req, res, next) {
    let page = req.params.page || 1;
    let data =student_md.getStudentForPage(page);
    if(data){
      data.then(function(data){
        res.render('admin/user.ejs',{data:data});
      }).catch(function(){
        res.render('admin/user.ejs',{data:{error:"Load list Student false."}});
      });
    }
  });
  router.get('/allStudent', function(req, res) {
    let data = student_md.getAllStudent();
    if(data){
      data.then(function(data){
        res.render('admin/allStudent',{data:data});
      }).catch(function(req,res){
        res.redirect('admin/allStudent',{data:{err:"loi load"}});
      })
    }
  });
  module.exports = router;