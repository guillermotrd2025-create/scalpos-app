"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ── Get Settings (Creates default if not exists) ──
export async function getSettings() {
  let settings = await prisma.globalSettings.findFirst();
  if (!settings) {
    settings = await prisma.globalSettings.create({
      data: {} // Uses all schema defaults
    });
  }
  return settings;
}

// ── Update Settings ──
export async function updateSettings(data: {
  risk_per_trade_pct: number;
  default_sl_pts: number;
  default_tp_pts: number;
  operating_hours_start: string;
  operating_hours_end: string;
  max_trades_per_day: number;
  max_daily_loss_pct: number;
}) {
  const current = await getSettings();
  const updated = await prisma.globalSettings.update({
    where: { id: current.id },
    data
  });
  revalidatePath("/");
  revalidatePath("/settings");
  revalidatePath("/trades/new");
  return updated;
}

// ── Hard Reset Database ──
// Deletes all user data (Trades, Sessions, Dodged Bullets, mistakes) and resets Accounts balance
export async function hardResetDatabase() {
  // Ordered deletion to avoid foreign key constraint issues
  await prisma.preTradeChecklist.deleteMany();
  await prisma.mistake.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.dodgedBullet.deleteMany();
  await prisma.session.deleteMany();

  // Reset Accounts
  await prisma.account.updateMany({
    data: {
      current_balance: 10000 // A default assumption. Or we could reset to initial_balance
    }
  });
  
  // Actually, setting current_balance = initial_balance for all:
  const accounts = await prisma.account.findMany();
  for (const acc of accounts) {
    await prisma.account.update({
      where: { id: acc.id },
      data: { current_balance: acc.initial_balance }
    });
  }

  revalidatePath("/");
  revalidatePath("/settings");
  revalidatePath("/trades");
  return { success: true };
}
