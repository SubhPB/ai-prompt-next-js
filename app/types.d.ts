import 'next-auth';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: DefaultUser
    }
}