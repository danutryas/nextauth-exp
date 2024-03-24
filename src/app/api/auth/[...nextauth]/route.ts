import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "axios";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { username, password } = credentials;
        const res = await axios.post("https://dummyjson.com/auth/login", {
          username: username,
          password: password,
        });
        if (!res.data) {
          return null;
        }
        return res.data;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Access the response object here if needed
      // console.log(user);
      return true;
    },
    async jwt({ user, token }) {
      if (user) {
        token.email = user.email;
        token.image = user.image;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.gender = user.gender;
        token.token = user.token;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.username = token.username;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.gender = token.gender;
      session.user.token = token.token;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
