import mongoose from "mongoose";

const StoredSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    thickness: {
      type: Number,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    buyPrice: {
      type: Number,
      require: true,
    },
    buyCurrency: {
      type: String,
      required: true,
    },
    salePrice: {
      type: Number,
      require: true,
    },
    saleCurrency: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Stored", StoredSchema);
