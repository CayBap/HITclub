const q = require('q');
const db = require('../common/database');
//db.getConnection();

function getAllQuestion(){
    var defer = q.defer();
    var query = db.Question.find({},function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
               // console.log(result);
            }
        });
        return defer.promise;
}
function addQuestion(question){
    if(question){
        var defer = q.defer();
        var data = db.Question(question);
        data.save(function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
    }
    return defer.promise;
}
module.exports = {
    getAllQuestion:getAllQuestion,
    addQuestion: addQuestion
}