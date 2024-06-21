const User=require('../models/register.model')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
dotenv.config()
const Register=async (req,res)=>{
  try{
    // console.log("-1");
    const {name,number,email,password}=req.body;
    // console.log("-1")
      const checknumber=await User.findOne({number:number})
      const checkemail=await User.findOne({email:email})
      if(checknumber || checkemail) return res.status(400).json({message:"already exists"})
        const hashpassword=await bcrypt.hash(password,10);
        const newUser=await new User({name,number,email,password:hashpassword})
        await newUser.save();
        res.status(200).json({success:"new user is saved successfully"})
  }catch{
    res.status(404).json({error:"internal error"})
  }
}
const Login=async (req,res)=>{
  try{
    const {number,password}=req.body;
    const user=await User.findOne({number:number})
    if(!user ) return res.status(400).json({message:"user not found"})
    if(!(await bcrypt.compare(password,user.password)))  return res.status(400).json({message:"password wrong"})
    const token=await jwt.sign({userId:user._id},process.env.SECRETKEY,{expiresIn:"1h"})
     res.status(200).json({Success:"successfully login",token,userId:user._id})   
  }catch(err){
    console.log(err)
  }
}
const getAlluser=async (req,res)=>{
  try{
    // console.log("--1");
    const user=await User.find().populate('firm')
    // if(!user) return json.status(400).json({message:user})
    // console.log(user);
    res.status(200).json({user})
  }catch(err){
    res.status(404).json({error:"not user found"})
  }
}
const getuserbyId=async (req,res)=>{
  try{
  const userId=req.params.id;
  const userbyid=await User.findById(userId).populate('firm')
  if(!userbyid) return res.status(400).json({message:"user not found by this Id"})
    res.status(201).json(userbyid)
  }catch(err){
    res.status(404).json({error:"invalid user"})
  }
}

module.exports={Register,Login,getAlluser,getuserbyId};