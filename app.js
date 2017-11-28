const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const session = require("express-session");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.set("views",__dirname + "/app/views");
app.set("view engine","ejs");
//use public
app.use('/static',express.static(__dirname+"/public"));
//use controllers
var controllers = require(__dirname + "/app/controllers");
app.use(controllers);

app.listen(config.get("server.port"),config.get("server.host"),function(req,res){
    console.log("Server is listening on port "+config.get("server.port"));
})