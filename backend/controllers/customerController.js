const Customer = require("../models/Customer");
const Account = require("../models/Account");
const mongoose = require("mongoose");

exports.getActiveCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ active: true });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

