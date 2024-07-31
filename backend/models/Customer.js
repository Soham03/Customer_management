const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: Date }, // Optional field
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    accounts:{type:Array},
    tier_and_details: { type: Map, of: String }, // Map with string keys and values
  },
  { collection: "customers" }
);


module.exports = mongoose.model("customers", customerSchema);

