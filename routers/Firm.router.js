const {firm,deletefirm}=require('../controllers/firm.controller')
const verifyToken=require('../verifyToken/verifyToken')
const express=require('express')
const path=require('path')
const router=express.Router()
router.route('/firm').post(verifyToken,firm)
router.route('/firm/:firmId').delete(deletefirm);
router.route('/upload/:images').get(async (req,res)=>{
  const imageName=req.params.imageName
  res.headersSent('content-Type','image/jpeg')
  res.sendFile(path.join(__dirname,'..','upload',imageName))
})
module.exports=router