// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";

// export const { handlers, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//     authorized: async ({ auth }) => {
//       // Logged in users are authenticated, otherwise redirect to login page
//       return !!auth
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });
// auth.ts
// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
// })

// export { handler as GET, handler as POST }