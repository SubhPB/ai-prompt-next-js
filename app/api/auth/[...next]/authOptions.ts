// Byimaan

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { connectToDB } from "@utils/database";
import User  from "@models/user";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            // till here next js does not how to authorize the user, to do so the following method will this job.
            async authorize(credentials):Promise<any>{

                // type authorize = (...props) =>  user | null | Error;

                const db = await connectToDB();

                try {

                    const user = await User.findOne({
                        $or : [
                            {email: credentials?.email}
                        ]
                    });

                    if (user) {
                        
                        if (!user.isVerified){
                            throw new Error('The user is not verified!');
                        };
                        if (!credentials?.password){
                            throw new Error('Password was not given!');
                        };

                        const isPasswordCorrect = await bcrypt.compare(credentials?.password, user?.password);

                        if (!isPasswordCorrect){
                            throw new Error('The given password does not match!')
                        } else {
                            return user;
                        };

                    } else {
                        throw new Error("No user found with this email!")
                    }

                } catch (err: any) {
                    // In the case of an error, it is necessary to throw this error as told in documentation
                    // Only two things can be returned either 'null' or 'Error'
                    // 1) if returned 'null', then error wil be displayed to the user by next-js as an advise.
                    // 2) if returned 'Error', as we did so, then user will be sent to the Error page.
                    throw new Error(err)
                }
            }
        })
    ],
    pages: {
        signIn: '/sigin-in',
    },
    session: {
        strategy: 'jwt',
    }, 
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
        async jwt({token, user}){
            // props.user it is been returned by the providers.Creditionals!.

            // Our strategy is to customize the token by dumping the user info., So that this custom token will also be available in 
            // the session and further we can also customize session. Therefore we will be able to get user from both token and session

            if (user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token
        },
        async session({session, token}){
            // props.token is been returned by jwt(...b-b-blah)
            if (token){
                session.user._id = token._id;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.email = token.email;
                session.user.username = token.username
            }
            return session   
        }
    }
};
