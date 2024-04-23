import mongoose from "mongoose";

//const connectionString = `mongodb+srv://hatimtekri:sxofJlRbPmjVSOJW@cluster0.9k0ff36.mongodb.net/nextjs14?retryWrites=true&w=majority&appName=Cluster0`;
const connectionString = "mongodb+srv://hatim:yeomPj5EmxBh5ZeV@learn.zurrun3.mongodb.net/nextjs14?retryWrites=true&w=majority"

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    console.log("connectToDb try");
    await mongoose.connect(connectionString);
    console.log("DB connected successfully");
  } catch (error) {
    //throw new Error("Error connecting to Mongoose");
    console.log("error - ", error);
  }
};

export { connectToDb };
