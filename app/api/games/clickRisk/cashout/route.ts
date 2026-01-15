import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionDataId } = await req.json();
  const userId = session.user.id;

  let prism : any = prisma;


  const gameSession = await prism.gameSession.findFirst({
    where: {
      id: sessionDataId,
      userId,
      status: "ACTIVE",
    },
  });

  if (!gameSession) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const amount = gameSession.gameReward;

  // if (amount <= 0) {
  //   return NextResponse.json({ error: "Nothing to cashout" }, { status: 400 });
  // }

  const result = await prism.$transaction(async (tx : any) => {
    const finished = await tx.gameSession.update({
      where: { id: gameSession.id },
      data: {
        status: "FINISHED",
        result: "CASHOUT",
      },
    });

    await tx.wallet.update({
      where: { userId },
      data: {
        balance: { increment: amount },
      },
    });

    await tx.transaction.create({
      data: {
        userId,
        amount,
        type: "Cashout ClickRisk",
        gameSessionId: gameSession.id,
      },
    });

    return finished;
  });

  return NextResponse.json({
    cashout: result,
    amount,
  });
}