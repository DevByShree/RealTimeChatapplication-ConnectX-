import mongoose from 'mongoose';

const connectTOMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongodb");

    }
    catch(error){
        console.log("Error to connect mongodb ",error.message)

    }
}

export default connectTOMongoDB