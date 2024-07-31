const express = require("express");
const router = express.Router();
const { getActiveCustomers } = require("../controllers/customerController");
router.get("/api/customers", getActiveCustomers);
module.exports = router;
