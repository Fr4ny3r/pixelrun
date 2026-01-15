import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action } = await req.json();

  let prism : any = prisma;

  const user = await prism.user.findUnique({
    where: { email: session.user.email },
    include: { activeGame: true }
  });

  if (!user) return NextResponse.json({ error: "User not found" });

  // 1️⃣ START
  if (action === "START") {
    if (user.balance < 2)
      return NextResponse.json({ error: "No balance" });

    await prism.$transaction([
      prism.user.update({
        where: { id: user.id },
        data: { balance: { decrement: 2 } }
      }),
      prism.activeGame.create({
        data: {
          userId: user.id,
          game: "CLICK_RISK",
          clicks: 0,
          earned: 0,
          risk: 5
        }
      }),
      prism.transaction.create({
        data: {
          userId: user.id,
          amount: -2,
          type: "GAME_FEE",
          description: "Click Risk - Start"
        }
      })
    ]);

    return NextResponse.json({ status: "STARTED" });
  }

  // 2️⃣ CLICK
  if (action === "CLICK") {
    const game = user.activeGame;
    if (!game)
      return NextResponse.json({ error: "No active game" });

    const boom = Math.random() * 100 < game.risk;

    if (boom) {
      await prism.activeGame.delete({ where: { id: game.id } });

      await prism.gameLog.create({
        data: {
          userId: user.id,
          game: "CLICK_RISK",
          result: "LOSE",
          earned: 0,
          clicks: game.clicks
        }
      });

      return NextResponse.json({ result: "BOOM" });
    }

    const earned = game.earned + 2;
    const risk = game.risk + 5;

    await prism.activeGame.update({
      where: { id: game.id },
      data: {
        clicks: { increment: 1 },
        earned,
        risk
      }
    });

    return NextResponse.json({
      result: "SAFE",
      earned,
      risk
    });
  }

  // 3️⃣ CASHOUT
  if (action === "CASHOUT") {
    const game = user.activeGame;
    if (!game)
      return NextResponse.json({ error: "No active game" });

    await prism.$transaction([
      prism.user.update({
        where: { id: user.id },
        data: { balance: { increment: game.earned } }
      }),
      prism.activeGame.delete({ where: { id: game.id } }),
      prism.transaction.create({
        data: {
          userId: user.id,
          amount: game.earned,
          type: "GAME_WIN",
          description: "Click Risk - Cashout"
        }
      }),
      prism.gameLog.create({
        data: {
          userId: user.id,
          game: "CLICK_RISK",
          result: "WIN",
          earned: game.earned,
          clicks: game.clicks
        }
      })
    ]);

    return NextResponse.json({
      result: "WIN",
      earned: game.earned
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
