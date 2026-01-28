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

  let prism : any = prisma;
  const COST = GAME_COSTS.CLICK_RISK; // 2
  

  const userId = session.user.id;
  const verifiedSessionActive = await prism.gameSession.findFirst({
    where: { userId, status: "ACTIVE" },
    orderBy: {startedAt: 'desc'},
  });

  const wallet = await prism.wallet.findUnique({
    where: { userId },
  });

  if (!wallet || wallet.balance < COST) {
    return NextResponse.json({ fondo: true })
  }

  if (verifiedSessionActive != null) return NextResponse.json({ gameSession: verifiedSessionActive,  estado: "ya tienes una session activa" })

  const { clientSeed } = await req.json();
  const serverSeed = crypto.randomUUID();
  const nonce = 1;


  const gameSession = await prism.$transaction(async (tx : any) => {
  // 1️⃣ Verificar balance
  const wallet = await tx.wallet.findUnique({
    where: { userId },
  });

  if (!wallet || wallet.balance < COST) {
    return NextResponse.json({ fondo: true })
  }

  // 2️⃣ Cobrar
  await tx.wallet.updateMany({
    where: { userId },
    data: {
      balance: { decrement: COST },
    },
  });


  // 4️⃣ Crear sesión de juego
  const gameSession = await tx.gameSession.create({
    data: {
      userId,
      gameType: "CLICK_Y_GANA",
      gameCost: -COST,
      percentLoss: 0,
      gameReward: 2,
      status: "ACTIVE",
      clientSeed: clientSeed || crypto.randomUUID(),
      serverSeed,
      nonce
    },
  });


  await tx.transaction.create({
    data: {
      userId,
      amount: -COST,
      type: "Cobro: Click y gana!",
      gameSessionId: gameSession.id,
    },
  });
  return gameSession;
});




 return NextResponse.json({ gameSession: gameSession, estado: null, porcentajePerdida : gameSession.percentLoss });
}
