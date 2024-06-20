import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DebtSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const BuyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  debts: [DebtSchema],
  payments: [PaymentSchema],
  buyers: [BuyerSchema], // Use plural 'buyers' here
});

export default model("Customer", CustomerSchema);
