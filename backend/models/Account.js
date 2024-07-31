const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    account_id: { type:Number, required: true, unique: true },
    limit: { type: Number, required: true },
    products: [{type:String}],
    _id:{type:mongoose.Types.ObjectId,ref:"customers"}
}, {collection:'accounts' });

module.exports = mongoose.model('accounts',accountSchema);
