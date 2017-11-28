const express = require('express');
var router = express.Router();
const question_md = require("../../models/questionM");

router.get('/allQuestion',function(req,res){
    let data = question_md.getAllQuestion();
    if(data){
        data.then(function(question){
           // console.log(question);
            res.render('admin/allQuestion',{data:question});
        }).catch(function(){
            res.render('admin/allQuestion',{data:{error:"loi khong load duoc"}});
        }
        );
    }
});
router.get('/addQuestion',function(req,res){
    res.render('admin/addQuestion');
})
router.post('/addQuestion',function(req,res){
    let params = req.body;
    if(params){
      if(params.question.trim().length == ""||params.answer1.trim().length==""||params.answer2.trim().length ==""||params.answer3.trim().length==""||params.answer4.trim().length==""){
        res.render('admin/addQuestion',{data:{error:'Thiếu thông tin'}});
      }
      else{
        var now = new Date();
        params.createdAt = now;
        params.updatedAt = now;
        let data = question_md.addQuestion(params);
        console.log(data);
        if(data){
            data.then(function(result){
                res.redirect('/admin/allQuestion');
            }).catch(function(err){
              res.render('admin/addQuestion',{data:{error:'Lỗi thêm câu hỏi'}});
            });
        }
      };
      }
})
module.exports = router;