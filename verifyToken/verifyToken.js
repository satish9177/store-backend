const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')
const User=require('../models/register.model')
dotenv.config()
const verifyToken=async (req,res,next)=>{
  try{
    const Token=req.headers.token
    if(!Token) return res.status(400).json({token:"token not found"})
    const decoded=jwt.verify(Token,process.env.SECRETKEY)
    //  console.log(decoded)
    if(!decoded) return res.status(400).json({user:"user not found"})
      const user=await User.findById(decoded.userId)
     req.userId=user._id
    next()
  }catch(err){
    res.status(404).json({error:` ${err}`})
  }
}
module.exports=verifyToken