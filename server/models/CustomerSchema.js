import mongoose from "mongoose";

// const { Schema, model } = mongoose;

const DebtSchema = new mongoose.Schema({
  amount: {
    type: Number,
    // required: true,
  },
  currency: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    // required: true,
  },
  currency: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const BuyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

// StoreCustomer Schema
const StoreCustomerSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stored',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const CustomerSchema = new mongoose.Schema({
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
  buyers: [BuyerSchema],
  fromStore: [StoreCustomerSchema],
});

export default mongoose.model("Customer", CustomerSchema);
