const express = require('express');
var router = express.Router();

router.use('/admin',require(__dirname+'/admin/admin'));
router.use('/api',require(__dirname+'/api/api'));

router.get('/',function(req,res){
    res.json({"messenger":"This is home page"});
});
module.exports = router;
