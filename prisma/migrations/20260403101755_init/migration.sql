-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME,
    "total_pnl" REAL NOT NULL DEFAULT 0,
    "discipline_score" INTEGER NOT NULL DEFAULT 100,
    "emotional_state" TEXT NOT NULL DEFAULT 'CALM',
    "notes" TEXT,
    "conclusion" TEXT,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asset" TEXT NOT NULL DEFAULT 'DAX',
    "direction" TEXT NOT NULL,
    "setup_type" TEXT NOT NULL DEFAULT 'Manual',
    "rr_planned" REAL NOT NULL DEFAULT 1.0,
    "entry_price" REAL,
    "sl_price" REAL,
    "tp_price" REAL,
    "result_pnl" REAL NOT NULL DEFAULT 0,
    "screenshot_pre" TEXT,
    "screenshot_post" TEXT,
    "is_in_plan" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Trade_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PreTradeChecklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trade_id" INTEGER NOT NULL,
    "has_fomo" BOOLEAN NOT NULL DEFAULT false,
    "is_extended" BOOLEAN NOT NULL DEFAULT false,
    "is_chasing" BOOLEAN NOT NULL DEFAULT false,
    "is_revenge_trade" BOOLEAN NOT NULL DEFAULT false,
    "has_confirmation" BOOLEAN NOT NULL DEFAULT false,
    "is_correct_session" BOOLEAN NOT NULL DEFAULT false,
    "has_clear_sl" BOOLEAN NOT NULL DEFAULT false,
    "follows_higher_tf" BOOLEAN NOT NULL DEFAULT false,
    "risk_score" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PreTradeChecklist_trade_id_fkey" FOREIGN KEY ("trade_id") REFERENCES "Trade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mistake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trade_id" INTEGER NOT NULL,
    "mistake_type" TEXT NOT NULL,
    "penalty_score" INTEGER NOT NULL DEFAULT 5,
    "note" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Mistake_trade_id_fkey" FOREIGN KEY ("trade_id") REFERENCES "Trade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PreTradeChecklist_trade_id_key" ON "PreTradeChecklist"("trade_id");
