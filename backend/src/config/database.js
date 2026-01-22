import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
