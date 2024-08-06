import mongoose from "mongoose";

const DebtSchema = new mongoose.Schema({
  amount: {
    type: Number,
    // required: true,
  },
  date: {
    type: Date,
    default: new Date(),
    // required: true,
  },
});

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    // required: true,
  },
  date: {
    type: Date,
    default: new Date(),
    // required: true,
  },
});

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    default: new Date(),
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  debts: [DebtSchema],
  payments: [PaymentSchema],
});

export default mongoose.model("Employees", EmployeeSchema);
