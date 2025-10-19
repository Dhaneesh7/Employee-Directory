import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Create a single MongoClient instance
const client = new MongoClient(process.env.MONGO_URI);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");
    return client.db(); // Returns the database instance
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
