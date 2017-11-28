const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(config.get("mongoose"));
//acc admin
var userSchema = new mongoose.Schema({
    userName: {type:String,unique:true},
    passWord: {type:String}
});
var User = mongoose.model('admin',userSchema);
//acc student
var studentSchema = new mongoose.Schema({
    idStudent: {type:String,unique:true},
    class: {type:String},
    name:{type:String},
    age:{type:String},
    score:{type:Number},
    phoneNumber:{type:String},
    birthday:{type:String},
    password:{type:String},
    createdAt: {type:Date},
    updatedAt:{type:Date},
    where:{type:String}
});
var Student = mongoose.model('user',studentSchema);
var questionSchema = new mongoose.Schema({
    question :{type:String},
    answer1:{type:String},
    answer2:{type:String},
    answer3:{type:String},
    answer4:{type:String},
    trueAnswer:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date}
});
var Question = mongoose.model('question',questionSchema);
function getConnection(){
    const db_connect =  mongoose.connection;
    
    db_connect.on('err', console.error.bind(console, 'connect err'))
    db_connect.once('open', function() {
      console.log('Connected mongodb !!!!')
    });
}
module.exports ={
    getConnection:getConnection,
    User:User,
    Student:Student,
    Question:Question
}