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

  function sha256(input: string) {
    return crypto.createHash("sha256").update(input).digest("hex");
  }

  const userId = session.user.id;

    const gameSession = await prisma.gameSession.findFirst({
      where: { status: "ACTIVE" },
      select: {
        id: true,
        gameReward: true,
        serverSeed: true,
        clientSeed: true,
        nonce: true,
      }
    });

 
  if (gameSession === null) return NextResponse.json({ estado: "no tienes una session activa" });

  const id = gameSession.id;
  const gameReward = gameSession.gameReward;
  const serverSeed = gameSession.serverSeed;
  const clientSeed = gameSession.clientSeed;
  const nonce = gameSession.nonce + gameSession.nonce;
  const endAt = new Date;
	const hash = sha256(serverSeed + clientSeed + nonce);
  const roll = parseInt(hash.slice(0, 8), 16) % 100;
  const lostP = nonce+2;
  
  await prisma.gameSession.update({
    where: { id },
    data: {
      nonce: nonce,
    }
  })

  if (roll <= lostP){
  	const state = "Perdiste"
    const gameSession = await prisma.$transaction(async (tx) => {

    const gameSession = await tx.gameSession.update({
      where: { id },
      data: {
        result: "LOST",
        status: "FINISHED",
        endedAt: endAt,
      },
    })
    return gameSession;
    });
		return NextResponse.json({ gameSession: gameSession, porcentajePerdida: lostP });
  
  } else{
  	const state = "ganaste"
    const gameSession = await prisma.$transaction(async (tx) =>{

    const gameSession = await tx.gameSession.update({
      where: { id },
      data: {
        gameReward: gameReward * 2,
      },
    })

    return gameSession;
    })
		return NextResponse.json({ gameSession: gameSession, porcentajePerdida: lostP });
  }



}