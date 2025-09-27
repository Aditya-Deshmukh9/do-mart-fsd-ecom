import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log(String(process.env.MONGO_URI));

    const connection = await mongoose.connect(String(process.env.MONGO_URI));

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
