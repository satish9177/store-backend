const mongoose=require('mongoose')
const FirmSchema=new mongoose.Schema({
  firmname:{
    type:String,
    require:true,
    unique:true
  },
  area:{
    type:String,
    require:true
  },
  category:{
    type:[{
    type:String,
    enum:["veg","non-veg"]
  }] },
  region:{
    type:[{
      type:String,
      enum:["south-indian","north-indian","chinese","bakery"]
    }]
  },
  offer:String,
  image:String,
  user:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  ],
  product:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }]
})
const Firm=mongoose.model('Firm',FirmSchema)
module.exports=Firm