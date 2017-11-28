const express = require('express');
router = express.Router();

router.get('/',(req,res)=>{
    res.json({"message":"This is api page"});
})
module.exports = router;