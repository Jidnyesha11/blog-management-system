const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is not defined in .env"
            );
        }

        if (!process.env.JWT_SECRET) {
            throw new Error(
                "JWT_SECRET is not defined in .env"
            );
        }

        const connection =
            await mongoose.connect(
                process.env.MONGODB_URI
            );

        console.log(
            `MongoDB connected: ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            `MongoDB connection failed: ${error.message}`
        );

        process.exit(1);
    }
};

module.exports = connectDB;