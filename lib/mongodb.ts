import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

const connectDB = async (): Promise<void> => {

   try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
   } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw err;
   }
}

export default connectDB;