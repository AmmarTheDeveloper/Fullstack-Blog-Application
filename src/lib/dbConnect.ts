import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

let connection: ConnectionObject = {};

const dbConnect: () => Promise<void> = async () => {
  try {
    if (connection.isConnected) return;
    await mongoose.connect(process.env.MONGO_URL!);
    connection.isConnected = mongoose.connections[0].readyState;
    console.log("Connected to database successfully");
    return;
  } catch (error) {
    console.log("Error occured while connecting to database");
    process.exit(1);
  }
};

export default dbConnect;
