import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

       console.log(` \n MongoDB connected ! DB Host: ${connectionInstance.connection.host}`);
       
        
    } catch (error) {
        console.log("MongoDB Connection error: ", error);
        process.exit(1)             //exiting the process if connnection fails
        
    }
}

export default connectDB