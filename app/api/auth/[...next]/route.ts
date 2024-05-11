// Byimaan

import NextAuth from "next-auth/next";
import { options } from "./authOptions";

const handler = NextAuth(options);

export {handler as GET, handler as POST}