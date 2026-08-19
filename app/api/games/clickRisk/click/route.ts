import crypto from "crypto";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  let prism : any = prisma;
  

  const gameSession = await prism.gameSession.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
  });

  if (!gameSession) {
    return NextResponse.json({ error: "No active session" }, { status: 400 });
  }

  /* ==========================
      PROVABLY FAIR RNG
  ========================== */
  const sha256 = (input: string) =>
    crypto.createHash("sha256").update(input).digest("hex");

  const nonce = gameSession.nonce + 1;
  const hash = sha256(
    gameSession.serverSeed + gameSession.clientSeed + nonce
  );

  const roll = parseInt(hash.substring(0, 8), 16) % 100;

  /* ==========================
      GAME LOGIC
  ========================== */
  const BASE_RISK = 2;
  const STEP_RISK = 5;
  const MAX_RISK = 100;

  const clicks = nonce;
  const percentLoss = Math.min(BASE_RISK + clicks * STEP_RISK,MAX_RISK)

  const BET = gameSession.gameCost;
  const multiplier = 1 + clicks * Math.random()*15;
  const rewardIncrement = Math.floor(BET + multiplier);
  const now = new Date();

  /* ==========================
      UPDATE NONCE FIRST
  ========================== */
  await prism.gameSession.update({
    where: { id: gameSession.id },
    data: { nonce },
  });

    /* ==========================
      UPDATE click count + 1
  ========================== */
  await prism.gameSession.update({
    where: { id: gameSession.id },
    data: { clickCount: nonce },
  });

  /* ==========================
      LOSE
  ========================== */
  if (roll < percentLoss) {
    const finished = await prism.gameSession.update({
      where: { id: gameSession.id },
      data: {
        status: "FINISHED",
        result: "LOST",
        percentLoss,
        endedAt: now,
        duration: Math.floor(
          (now.getTime() - gameSession.startedAt.getTime()) / 1000
        ),
      },
    });

    await prism.transaction.updateMany({
      where: { gameSessionId: gameSession.id },
      data: {
        type: "Cobro: ClickRisk (Perdido)",
      },
    });

    return NextResponse.json({
      gameSession: finished,
      porcentajePerdida: percentLoss,
      roll,
      lost: true,
    });
  }

  /* ==========================
      WIN
  ========================== */
  const updated = await prism.gameSession.update({
    where: { id: gameSession.id },
    data: {
      gameReward: { increment: Math.abs(rewardIncrement) },
      percentLoss,
    },
  });

  return NextResponse.json({
    gameSession: updated,
    porcentajePerdida: percentLoss,
    roll,
    reward: Math.abs(rewardIncrement),
    lost: false,
  });
}
