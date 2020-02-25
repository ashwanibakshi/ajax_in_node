var express    = require('express');
var taskModel  = require('../models/task');

var router = express.Router();

router.get('/home',(req,res)=>{
 res.render('demo');
});


router.post('/addtask',(req,res)=>{
          var taskk = new taskModel({
              task:req.body.task
          });
          taskModel.addTask(taskk,(err,taskData)=>{
              if(err){
                  res.json({msg:'error'});
              }else{
                  res.json({msg:'success'});
              }
          });
});

router.get('/gettask',(req,res)=>{
  taskModel.getTask((err,taskData)=>{
          if(err){
              res.json({msg:'error'});
          }else{
              res.json({msg:'success',data:taskData});
          }
  });
});

router.delete('/removetask',(req,res)=>{
      taskModel.removeTask(req.body.id,(err,taskData)=>{
            if(err){
                res.json({msg:'error'});
            }else{
                res.json({msg:'success'});
            }
      });
});

module.exports = router;