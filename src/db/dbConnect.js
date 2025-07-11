const mongoose = require("mongoose");

const dbConnect = async () => {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
};

module.exports = dbConnect;