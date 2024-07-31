const express=require('express')
const router=express.Router()
const {getAccountTransactions,getTransactions}=require('../controllers/accountController')

router.get('/api/:id/transactions',getTransactions)

module.exports=router;