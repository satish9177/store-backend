const mongoose=require('mongoose');
const RegisterSchema=new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  number:{
    type:String,
    require:true,
    uniquie:true
  },
  email:{
    type:String,
    require:true,
    uniquie:true
  },
  password:{
    type:String,
    require:true
  },
  firm:[
     {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Firm'
    }
  ]
})
const User=mongoose.model('User',RegisterSchema);
module.exports=User