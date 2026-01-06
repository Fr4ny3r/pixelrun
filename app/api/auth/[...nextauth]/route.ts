// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async signIn({ user }) {
    // console.log(user)
    // if (!user?.id) return false;

    // const existingWallet = await prisma.wallet.findUnique({where : {userId: user.id}});

    // if (!existingWallet) {
    // await prisma.wallet.create({
    //     data: {
    //       userId: user.id,
    //       balance: 100,
    //     },
    //   });
    // }
    //   return true;
    // },
    async jwt({ token, user }) {
      // SOLO en el login inicial
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    // Este evento es el lugar correcto para crear la Wallet
    async createUser({ user }) {
      await prisma.wallet.create({
        data: {
          userId: user.id,
          balance: 100, // Bono inicial para nuevos usuarios
        },
      });
    },
  },
  httpOptions: {
    timeout: 10000, // 10 segundos en lugar de 3.5
  },
};

// Solo exporta NextAuth con authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // App Router espera GET y POST