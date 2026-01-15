import crypto from 'crypto'
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let prism : any = prisma;


  const gameSession = await prism.gameSession.updateMany({
    where: {
      userId: session.user.id,
      status: "ACTIVE",
    },
    data: {
      status: "ABANDONED",
      endedAt: new Date(),
    },
  });


    const tx = await prism.transaction.findFirst({
      where:{gameSessionId: gameSession.id},
      orderBy: {createdAt: 'desc'},
    });

    if (tx) {

    await prism?.transaction.update({
      where: { id : tx.id },
      data: {
        type: "Cobro: Click y gana! (Abandono!)",
      },
    });
    }

 return NextResponse.json({ "Juego Cerrado automaticamente por abandono": gameSession });


}