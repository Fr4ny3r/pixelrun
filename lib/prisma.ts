// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// SOLO crear PrismaClient en servidor
export const prisma =
  typeof window === "undefined" // ❌ Evita ejecutar en cliente
    ? globalThis.prismaGlobal ?? prismaClientSingleton()
    : null;

if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  globalThis.prismaGlobal = prisma;
}