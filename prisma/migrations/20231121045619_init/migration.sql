-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "platform" TEXT,
    "wins" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "kdratio" REAL NOT NULL,
    "winpercentage" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
