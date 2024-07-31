const mongoose=require('mongoose')
const transactionSchema = new mongoose.Schema({
    account_id: { type: Number, ref: 'Account', required: true },
    transaction_count: { type: Number, required: true },
    bucket_start_date: { type: Date },
    bucket_end_date: { type: Date },
    transaction: [{  
      amount: Number,
      date: Date,
      transaction_code:String,
      symbol:String,
      price:String,
      total:Number,
    }]
  },{ collection: 'transactions' });

module.exports=mongoose.model('transactions',transactionSchema)