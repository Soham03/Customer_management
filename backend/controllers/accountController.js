const Account = require("../models/Account");
const Transaction=require("../models/Transaction");
const mongoose=require("mongoose")

exports.getAccountTransactions = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).populate(
      "transactions"
    );
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const accountId = parseInt(req.params.id,10);
    
    const transactions = await Transaction.find({account_id:accountId});
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
