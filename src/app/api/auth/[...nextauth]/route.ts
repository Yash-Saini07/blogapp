import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Compare input with .env variables
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Return user object if valid
          return { id: "1", name: "Admin", email: process.env.ADMIN_EMAIL };
        }
        // Return null if invalid
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login', // Custom login page path
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };