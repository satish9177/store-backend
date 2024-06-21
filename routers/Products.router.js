const express=require('express')
const path=require('path')
const router=express.Router();
const {addproduct,getproductbyId,getproductbyFirm,deleteproductbyId}=require('../controllers/Product.controller')
router.route('/addproduct/:firmId').post(addproduct)
router.route('/getproductbyId/:productId').get(getproductbyId)
router.route('/getproductbyId/:productId').delete(deleteproductbyId)
router.route('/getproductbyfirm/:firmId').get(getproductbyFirm)
router.route('/upload/:imageName').get(async (req,res)=>{
  const imageName=req.params.imageName
  res.header('Content-Type','image/jpeg')
  res.sendFile(path.join(__dirname,'..','upload',imageName))
})
module.exports=router