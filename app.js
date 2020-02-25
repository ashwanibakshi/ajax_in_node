var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var path        = require('path');
var $           = require('jquery');

//connect to db
mongoose.connect('mongodb://localhost:27017/ajaxdemo',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('connection error',err))

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//set the path of the jquery file to be used from the node_module jquery package
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));

//set static folder(public) path
app.use(express.static(path.join(__dirname+'/public')));

//default page load
app.get('/',(req,res)=>{
  res.redirect('/task/home');
});

//routes
app.use('/task',require('./routes/taskroute'));

//assign port
var port  = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));