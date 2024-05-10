// Byimaan

import mongoose from "mongoose";
import { print } from "./functions";
import { ConnectionOptions } from "tls";

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set('strictQuery', true);

    if (!isConnected){

        try {
            // let's try to connect database
            await mongoose.connect(process.env.MONGODB_URI!, {
              dbName: 'share_prompt',
            });

            isConnected = true;
            print('Byimaan: MongoDB connected!')
        } catch (error) {
            print("Byimaan: Connection with MongoDB not got establish.")
        } 

    } else {
        print("Byimaan: Database has already been connected!")
        return;
    }
}