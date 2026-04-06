/*
  Warnings:

  - You are about to drop the column `follows_higher_tf` on the `PreTradeChecklist` table. All the data in the column will be lost.
  - You are about to drop the column `has_clear_sl` on the `PreTradeChecklist` table. All the data in the column will be lost.
  - You are about to drop the column `has_confirmation` on the `PreTradeChecklist` table. All the data in the column will be lost.
  - You are about to drop the column `is_correct_session` on the `PreTradeChecklist` table. All the data in the column will be lost.
  - You are about to drop the column `emotional_state` on the `Session` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "initial_balance" REAL NOT NULL DEFAULT 10000,
    "current_balance" REAL NOT NULL DEFAULT 10000,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DodgedBullet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    CONSTRAINT "DodgedBullet_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PreTradeChecklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trade_id" INTEGER NOT NULL,
    "has_fomo" BOOLEAN NOT NULL DEFAULT false,
    "is_extended" BOOLEAN NOT NULL DEFAULT false,
    "is_chasing" BOOLEAN NOT NULL DEFAULT false,
    "is_revenge_trade" BOOLEAN NOT NULL DEFAULT false,
    "is_out_of_hours" BOOLEAN NOT NULL DEFAULT false,
    "trend_aligned" BOOLEAN NOT NULL DEFAULT false,
    "pullback_ema" BOOLEAN NOT NULL DEFAULT false,
    "atr_above_avg" BOOLEAN NOT NULL DEFAULT false,
    "vwap_favor" BOOLEAN NOT NULL DEFAULT false,
    "break_structure" BOOLEAN NOT NULL DEFAULT false,
    "risk_score" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PreTradeChecklist_trade_id_fkey" FOREIGN KEY ("trade_id") REFERENCES "Trade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PreTradeChecklist" ("created_at", "has_fomo", "id", "is_chasing", "is_extended", "is_revenge_trade", "risk_score", "trade_id") SELECT "created_at", "has_fomo", "id", "is_chasing", "is_extended", "is_revenge_trade", "risk_score", "trade_id" FROM "PreTradeChecklist";
DROP TABLE "PreTradeChecklist";
ALTER TABLE "new_PreTradeChecklist" RENAME TO "PreTradeChecklist";
CREATE UNIQUE INDEX "PreTradeChecklist_trade_id_key" ON "PreTradeChecklist"("trade_id");
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME,
    "checklist_passed" BOOLEAN NOT NULL DEFAULT false,
    "total_pnl" REAL NOT NULL DEFAULT 0,
    "discipline_score" INTEGER NOT NULL DEFAULT 100,
    "mental_state" TEXT NOT NULL DEFAULT 'A_GAME',
    "notes" TEXT,
    "conclusion" TEXT,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Session" ("conclusion", "created_at", "date", "discipline_score", "end_time", "id", "is_closed", "notes", "start_time", "total_pnl", "updated_at") SELECT "conclusion", "created_at", "date", "discipline_score", "end_time", "id", "is_closed", "notes", "start_time", "total_pnl", "updated_at" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE TABLE "new_Trade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" INTEGER NOT NULL,
    "account_id" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asset" TEXT NOT NULL DEFAULT 'DAX',
    "direction" TEXT NOT NULL,
    "setup_type" TEXT NOT NULL DEFAULT 'Manual',
    "rr_planned" REAL NOT NULL DEFAULT 1.0,
    "entry_price" REAL,
    "sl_price" REAL,
    "tp_price" REAL,
    "result_pnl" REAL NOT NULL DEFAULT 0,
    "setup_a_passed" BOOLEAN NOT NULL DEFAULT false,
    "risk_accepted" BOOLEAN NOT NULL DEFAULT false,
    "execution_score" INTEGER,
    "screenshot_pre" TEXT,
    "screenshot_post" TEXT,
    "is_in_plan" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Trade_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Trade_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trade" ("asset", "created_at", "direction", "entry_price", "id", "is_in_plan", "notes", "result_pnl", "rr_planned", "screenshot_post", "screenshot_pre", "session_id", "setup_type", "sl_price", "time", "tp_price", "updated_at") SELECT "asset", "created_at", "direction", "entry_price", "id", "is_in_plan", "notes", "result_pnl", "rr_planned", "screenshot_post", "screenshot_pre", "session_id", "setup_type", "sl_price", "time", "tp_price", "updated_at" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
