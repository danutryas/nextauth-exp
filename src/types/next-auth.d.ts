import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      image: string;
      token: string;
    } & DefaultSession["user"];
  }
  interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  }
}
