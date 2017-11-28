const q = require('q');
const db = require('../common/database');
let conn = db.getConnection();

function getUserByUserName(userName){
    if(userName){
        var defer = q.defer();
        var query = db.User.findOne({userName:userName},function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
       // console.log(query);
        return defer.promise;
    }
    return false;
}
module.exports = {
    getUserByUserName:getUserByUserName
}