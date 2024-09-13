import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(" Error in MongoDB connection: ", error.message);
        process.exit(1);
        
    }
}

export default ConnectDB;