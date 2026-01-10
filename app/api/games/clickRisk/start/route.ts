import { GAME_COSTS } from "@/lib/economy";
import crypto from 'crypto'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { clientSeed } = await req.json();
  const serverSeed = crypto.randomUUID();
  const nonce = 1;

  const COST = GAME_COSTS.CLICK_RISK; // 2
  const userId = session.user.id;

  const gameSession = await prisma.$transaction(async (tx) => {
  // 1️⃣ Verificar balance
  const wallet = await tx.wallet.findUnique({
    where: { userId },
  });

  if (!wallet || wallet.balance < COST) {
    throw new Error("INSUFFICIENT_FUNDS");
  }

  // 2️⃣ Cobrar
  await tx.wallet.update({
    where: { userId },
    data: {
      balance: { decrement: COST },
    },
  });

  // 3️⃣ Registrar transacción (CARGO)
  await tx.transaction.create({
    data: {
      userId,
      amount: -COST,
      type: "Costo por jugar: Click y gana!",
    },
  });

  // 4️⃣ Crear sesión de juego
  const gameSession = await tx.gameSession.create({
    data: {
      userId,
      gameType: "CLICK_Y_GANA",
      gameCost: -COST,
      gameReward: 2,
      status: "ACTIVE",
      clientSeed: clientSeed || crypto.randomUUID(),
      serverSeed,
      nonce
    },
  });

  return gameSession;
});
 return NextResponse.json({ "Game Session Create": gameSession });
}
