/*
  Warnings:

  - Added the required column `auditDeleteDate` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditDeleteDate` to the `CinemaRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinemaId` to the `CinemaRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `CinemaRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditDeleteDate` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cinema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditCreateUser" INTEGER NOT NULL DEFAULT 1,
    "auditCreateDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditUpdateUser" INTEGER NOT NULL,
    "auditUpdateDate" DATETIME NOT NULL,
    "auditDeleteUser" INTEGER NOT NULL,
    "auditDeleteDate" DATETIME NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "urlImage" TEXT NOT NULL
);
INSERT INTO "new_Cinema" ("auditCreateDate", "auditCreateUser", "auditDeleteUser", "auditUpdateDate", "auditUpdateUser", "duration", "id", "name", "state", "urlImage") SELECT "auditCreateDate", "auditCreateUser", "auditDeleteUser", "auditUpdateDate", "auditUpdateUser", "duration", "id", "name", "state", "urlImage" FROM "Cinema";
DROP TABLE "Cinema";
ALTER TABLE "new_Cinema" RENAME TO "Cinema";
CREATE TABLE "new_CinemaRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditCreateUser" INTEGER NOT NULL DEFAULT 1,
    "auditCreateDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditUpdateUser" INTEGER NOT NULL,
    "auditUpdateDate" DATETIME NOT NULL,
    "auditDeleteUser" INTEGER NOT NULL,
    "auditDeleteDate" DATETIME NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "endDate" DATETIME NOT NULL,
    "cinemaId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "CinemaRoom_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CinemaRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CinemaRoom" ("auditCreateDate", "auditCreateUser", "auditDeleteUser", "auditUpdateDate", "auditUpdateUser", "endDate", "id", "state") SELECT "auditCreateDate", "auditCreateUser", "auditDeleteUser", "auditUpdateDate", "auditUpdateUser", "endDate", "id", "state" FROM "CinemaRoom";
DROP TABLE "CinemaRoom";
ALTER TABLE "new_CinemaRoom" RENAME TO "CinemaRoom";
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditCreateUser" INTEGER NOT NULL DEFAULT 1,
    "auditCreateDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditUpdateUser" INTEGER NOT NULL,
    "auditUpdateDate" DATETIME NOT NULL,
    "auditDeleteUser" INTEGER NOT NULL,
    "auditDeleteDate" DATETIME NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Room" ("auditCreateDate", "auditCreateUser", "auditDeleteUser", "auditUpdateDate", "auditUpdateUser", "id", "name", "state") SELECT "auditCreateDate", "auditCreateUser", "auditDeleteUser", "auditUpdateDate", "auditUpdateUser", "id", "name", "state" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
