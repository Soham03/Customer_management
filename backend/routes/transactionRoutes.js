const express=require('express')
const router=express.Router()
const {getTransactionsBelowAmount,getDistinctProducts}=require('../controllers/transactionController')

router.get('/api/below-amount',getTransactionsBelowAmount);
router.get('/api/distinct-products',getDistinctProducts);
module.exports=router;