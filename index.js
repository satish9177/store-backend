const express=require('express')
const Register=require('./routers/Register.router')
const Firm=require('./routers/Firm.router')
const Products=require('./routers/Products.router')
const connectDB=require('./config/config')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
connectDB();
app.use(express.json())
app.use(cors())
const PORT=process.env.PORT || 3000
app.get('/',(req,res)=>{
  res.send('server is running...')
})
app.use('/auth',Register);
app.use('/data',Firm)
app.use('/products',Products)
app.use('/upload',express.static('upload'))
mongoose.connection.once('open',
 ()=>{
  app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
  })
 }
)
