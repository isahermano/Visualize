import mongoose from "mongoose";

const connectDB = async () => {
    // when mongoose is connected, this function will execute
    mongoose.connection.on('connected',()=> {
        console.log("DB Connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/visualize`)
}

export default connectDB