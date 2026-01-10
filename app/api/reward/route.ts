import { REWARDS } from "@/lib/economy";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // const lastReward = await prisma.$transaction([

  //   prisma.transaction.findFirst({
  //   where: {
  //     userId,
  //     type: "AD_WATCHED",
  //   },
  //   orderBy: { createdAt: "desc" },
  //   }

  // ])


  // if (lastReward && Date.now() - lastReward.createdAt.getTime() < 60_000) {
  //   return NextResponse.json(
  //     { error: "Cooldown active" },
  //     { status: 429 }
  //   );
  // }
  const { type } = await req.json();

  const validType = (type)=>{
    if (type === "DAILY_BONUS"){
      const type = "Bono diario"
      return type;
    } else if (type === "PLAY_CHARGE"){
      const type = "Cobro por jugar"
      return type;
    }
  }



  const amount = REWARDS[type];

  if (!amount) {
    return NextResponse.json(
      { error: "Invalid reward type" },
      { status: 400 }
    );
  }

  const userId = session.user.id;

  // (opcional) cooldown / anti abuse aquí
  

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId,
        amount,
        type : validType(type),
      },
    }),
    prisma.wallet.update({
      where: { userId },
      data: {
        balance: { increment: amount },
      },
    }),
  ]);

  return NextResponse.json({ success: true, amount });
}
  