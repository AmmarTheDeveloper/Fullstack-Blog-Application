import mongoose, { model, models } from "mongoose";
import { userSchema, UserType } from "@/models/User";

type ConnectionObject = {
  isConnected?: number;
};

let connection: ConnectionObject = {};

const dbConnect: () => Promise<void> = async () => {
  try {
    if (connection.isConnected) return;
    await mongoose.connect(process.env.MONGO_URL!);
    connection.isConnected = mongoose.connections[0].readyState;
    //loading the user because it was giving error when i was refreshing my server because if user is already logged in the this model was not loaded so i want when database connect it should be created immediately
    const User =
      (models.User as mongoose.Model<UserType>) ||
      model<UserType>("User", userSchema);

    console.log("Connected to database successfully");
    return;
  } catch (error) {
    console.log("Error occured while connecting to database");
    process.exit(1);
  }
};

export default dbConnect;
