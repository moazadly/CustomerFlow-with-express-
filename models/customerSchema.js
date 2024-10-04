const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);
const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
