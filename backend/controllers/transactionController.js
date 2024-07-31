const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

exports.getTransactionsBelowAmount = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const accountsWithLowAmount = await Transaction.find({
      transactions: {
        $elemMatch: {
          amount: { $lt: 5000 },
        },
      },
    })
      .select("account_id")
      .skip(skip)
      .limit(limit);

    const accountIds = accountsWithLowAmount.map(
      (account) => account.account_id
    );

    res.json(accountIds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDistinctProducts = async (req, res) => {
  try {
    const products = await Account.distinct("products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
