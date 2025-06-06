-- CreateTable
CREATE TABLE "Cinema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditCreateUser" INTEGER NOT NULL DEFAULT 1,
    "auditCreateDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditUpdateUser" INTEGER NOT NULL,
    "auditUpdateDate" DATETIME NOT NULL,
    "auditDeleteUser" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "urlImage" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CinemaRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditCreateUser" INTEGER NOT NULL DEFAULT 1,
    "auditCreateDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditUpdateUser" INTEGER NOT NULL,
    "auditUpdateDate" DATETIME NOT NULL,
    "auditDeleteUser" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "endDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditCreateUser" INTEGER NOT NULL DEFAULT 1,
    "auditCreateDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auditUpdateUser" INTEGER NOT NULL,
    "auditUpdateDate" DATETIME NOT NULL,
    "auditDeleteUser" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL
);
