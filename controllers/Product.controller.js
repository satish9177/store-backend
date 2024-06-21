const Product=require('../models/product.model')
const Firm =require('../models/firm.model')
const multer=require('multer')
const Path=require('path') 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); // specify the destination folder where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+Path.extname( file.originalname)); // generate unique filename for uploaded file
  }
});
const upload = multer({ storage: storage });
// ProductName, price , category, image , bestseller, description , firm
const addproduct=async (req,res)=>{
    try {
       const {ProductName, price, category, bestseller, description}=req.body;
       const firmId=req.params.firmId;
      //  console.log(firmId)
      const image = req.file ? req.file.filename : undefined;
       const firm=await Firm.findById(firmId);
          // console.log(firm)
       if(!firm) return res.status(400).json({message:"firm not found"})
        const newproduct=await Product({ProductName, price, category, bestseller, description,image,firm:firmId});
        const add= await newproduct.save()
          firm.product.push(add);
        await firm.save();
        res.status(200).json("product is added")
    } catch (error) {
      res.status(404).json({error:"not found"})
    }
}
const getproductbyId= async (req,res)=>{
  try {  
        const productId=req.params.productId;
        const getproduct=await Product.findById(productId)
        if(!getproduct) return res.status(400).json({message:"product Id not found"})
          res.status(200).json({getproduct})
  } catch (error) {
    res.status(404).json({error:"not found"})
  }
}
const deleteproductbyId= async (req,res)=>{
  try {
    const productId=req.params.productId;

    const findproduct=await Product.findByIdAndDelete(productId)
    if(!findproduct) return res.status(400).json({message:"product Id not found"})
      res.status(200).json("successfully deleted")
  } catch (error) {
    res.status(404).json({error:error})
  }
}
const getproductbyFirm=async (req,res)=>{
  try {
    const firmId=req.params.firmId;
    const getfirm=await Firm.findById(firmId);
    if(!getfirm) return res.status(400).json({message:"firm Id not found"})
      const products=await Product.find({firm:firmId})
    res.status(200).json({products})
  } catch (error) {
    res.status(404).json({error:"not found"})
  }
}

module.exports={addproduct:[upload.single('image'),addproduct],getproductbyId,getproductbyFirm,deleteproductbyId};
