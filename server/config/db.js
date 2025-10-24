import mongoose from "mongoose"


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('<<<<<<< MongoDB Connected! >>>>>>>'.cyan.bold.underline)
    } catch (error) {
        console.log('MongoDB Error:'.red.bold, error)
    }
}
export default connectDB