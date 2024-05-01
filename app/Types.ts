// Byimaan
import { SessionOptions } from "next-auth";
import { DefaultUser } from "next-auth";

export interface ProfileTS {
    email: string;
    name: string;
    picture: string;
}


export interface SessionPropTS {
    session: {
        user: DefaultUser
    }
}

export interface SignInPropTS {
    profile: ProfileTS,
}