const q = require('q');
const db = require('../common/database');
//let conn = db.getConnection();

function getAllStudent(){
    var defer = q.defer();
    var query = db.Student.find({},function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
}

function addStudent(student){
    if(student){
        var defer = q.defer();
        var data = db.Student(student);
        data.save(function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        })
    }
    return defer.promise;
}
function getStudentById(id){
    if(id){
        var defer = q.defer();
        var query = db.Student.findOne({_id:id},function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}
function updateStudent(data){
    if(data){
        var defer = q.defer();
        var query = db.Student.update(data,function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;

}
function deleteStudent(data){
    if(data){
        var defer = q.defer();
        // console.log(data);
        var query = db.Student.remove({_id:data},function(err,result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}
function getStudentForPage(page){
    if(page){
        let perPage = 9;
        let data=1;
         var defer = q.defer();
        db.Student.find({}).skip((perPage * page) - perPage) .limit(perPage).exec(function(err, products) {
            db.Student.count().exec(function(err, count) {
                if (err) return next(err)
                data = {
                    products: products,
                    current: parseInt(page),
                    pages: Math.ceil(count / perPage)
                };
                if(err){
                    defer.reject(err);
                }else{
                    defer.resolve(data);
                }
            });
        });
        return defer.promise;
    }
      return false;
}
module.exports = {
    getAllStudent:getAllStudent,
    addStudent: addStudent,
    getStudentById:getStudentById,
    updateStudent:updateStudent,
    deleteStudent:deleteStudent,
    getStudentForPage:getStudentForPage

}