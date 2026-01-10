/*
  Warnings:

  - Added the required column `gameCost` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "gameCost" INTEGER NOT NULL,
    "gameReward" INTEGER,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    "duration" INTEGER,
    "status" TEXT NOT NULL,
    "serverSeed" TEXT NOT NULL,
    "clientSeed" TEXT,
    "nonce" INTEGER NOT NULL,
    CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameSession" ("clientSeed", "duration", "endedAt", "gameType", "id", "nonce", "serverSeed", "startedAt", "status", "userId") SELECT "clientSeed", "duration", "endedAt", "gameType", "id", "nonce", "serverSeed", "startedAt", "status", "userId" FROM "GameSession";
DROP TABLE "GameSession";
ALTER TABLE "new_GameSession" RENAME TO "GameSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
