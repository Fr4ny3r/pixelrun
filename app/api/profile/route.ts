// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 1️⃣ Usuario (solo lo que quieres exponer)
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      name: true,
      email: true,
      // image: true (si quieres)
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // 2️⃣ Wallet (solo balance)
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: session.user.id, // o userId si así lo tienes
    },
    select: {
      balance: true,
    },
  });

  // 3️⃣ Transacciones (limpias)
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    select: {
      type: true,
      amount: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    user,
    wallet,
    transactions,
  });
}