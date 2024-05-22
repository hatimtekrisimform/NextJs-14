import mongoose from "mongoose";

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    console.log("connectToDb try");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully");
  } catch (error) {
    //throw new Error("Error connecting to Mongoose");
    console.log("error - ", error);
  }
};

export { connectToDb };
