const User=require('../models/register.model')
const Firm=require('../models/firm.model')
const multer=require('multer')
const path=require('path')
// firmName, area, category, region, offer , image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'upload/'); // Destination folder where the uploaded images will be stored
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  }
});
const upload = multer({ storage: storage });
const firm=async (req,res)=>{
    try{
       const {firmname,area,category,region,offer }=req.body;
      const image = req.file ? req.file.filename : undefined;
       const user=await User.findById(req.userId);
       if(!user) return res.status(404).json({failed:"user not found"})
        if(user.firm.length>0) return res.status(400).json({message:"already firm is existed"})
        const newfirm=await new Firm({firmname,area,category,region,offer,image,user:user._id})
      const data= await newfirm.save();
      user.firm.push(data);
      await user.save()
      res.status(201).json({success:"firm is saved",firmid:data._id,firmname:data.firmname})
    }catch(err){
      res.status(404).json({error:err})
    }
}
const deletefirm= async (req,res)=>{
  try {
      const firmId=req.params.firmId;
      // console.log(req.params)
      const getfirm=await Firm.findByIdAndDelete(firmId)
      if(!getfirm) return res.status(400).json({message:"firm not found"})
      res.status(200).json({message:"successfully deleted"})
  } catch (error) {
      res.status(404).json({error:"unable to delete"})
  }
}
module.exports={firm:[upload.single('image'),firm],deletefirm};
