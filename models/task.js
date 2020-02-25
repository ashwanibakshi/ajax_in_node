var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    task:{
        type:String
    }
});

var taskModel =  module.exports = mongoose.model('task',taskSchema);

module.exports.addTask = (task,cb)=>{
    task.save((err,taskData)=>{
            if(err){
                cb(err,null);
            }else{
                cb(null,taskData);
            }
    });
}

module.exports.getTask = (cb)=>{
    taskModel.find((err,taskData)=>{
          if(err){
              cb(err,null);
          }else{
              cb(null,taskData);
          }
    });
}

module.exports.removeTask = (id,cb)=>{
    taskModel.deleteOne({'_id':id},(err,taskData)=>{
            if(err){
                cb(err,null);
            }else{
                cb(null,taskData);
            }
    });
}