import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const Connection = async () => {
  const URL = process.env.CONNECTION_URL;

  mongoose.Promise = global.Promise;
  await mongoose
    .connect(URL) // connection line
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default Connection;
