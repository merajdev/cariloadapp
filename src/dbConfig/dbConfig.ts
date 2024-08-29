import mongoose from 'mongoose';

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.once('connected', () => {
            console.log("Connected to the database successfully");
        });

        connection.on('error', (err) => {
            console.log("Something went wrong while connecting to the database");
            console.log(err);
        });

    }catch(err){
        console.log("Something went wrong while connecting to the database");
        console.log(err);
    }
}