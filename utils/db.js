const mongoose = require('mongoose');


// const URI = "mongodb://127.0.0.1:27017/mern";

const URI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log(err);
        process.exit(0);
    }
};


module.exports = connectDB;




// aminul-auth010 	