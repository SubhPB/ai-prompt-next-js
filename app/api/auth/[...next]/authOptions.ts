// Byimaan

import Google from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import { print } from "@utils/functions";
import User from "@models/user";
import { SessionPropTS, SignInPropTS } from "@app/Types";

export const authOptions = {
    providers: [
        Google({
            // client id we got from google cloud after creating creditionals
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOGGLE_CLIENT_SECRET!
        })
    ],
    async signIn({profile}:SignInPropTS){
        // before start the session we need to perform signIn
        // every nextjs route is serverless route
        
        try {
            await connectToDB();

            // check if user exists.
            const userExists = await User.findOne({
                email: profile.email,
            });

            // if not, create a new user
            if (!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(' ', '').toLowerCase(),
                    image: profile.picture,
                })
            };

            return true;
        } catch (error) {
            print("Byimaan: SignIn unsuccessful", error);
            return false;
        };
    },
    async session({session}: SessionPropTS){
        const sessionUser = await User.findOne({
            email: session.user.email
        });
        session.user.id = sessionUser._id.toString()
        return session;
    },
};