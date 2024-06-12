const express=require('express')
const {Register,Login,getAlluser,getuserbyId}=require('../controllers/Register.controller')
const router=express.Router()
router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/getuserdata').get(getAlluser)
router.route('/getuserdata/:id').get(getuserbyId)
module.exports=router