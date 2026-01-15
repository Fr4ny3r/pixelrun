import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  let prism : any = prisma;
  

  const user = await prism.user.findUnique({
    where: { email: session.user.email },
  });

  const wallet = await prism.wallet.findUnique({
    where: { userId: user!.id },
  });

  return Response.json(wallet);
}
