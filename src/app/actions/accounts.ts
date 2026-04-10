"use server";

import { prisma } from "@/lib/prisma";
import { getSettings } from "./settings";
import { revalidatePath } from "next/cache";

// ── Get Active Accounts with current daily usage ──
export async function getAccountsStatus() {
  const accounts = await prisma.account.findMany({
    where: { is_active: true }, // Only active accounts
    orderBy: { created_at: "asc" }
  });

  const settings = await getSettings();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Count trades today for each account
  const accountStats = await Promise.all(
    accounts.map(async (acc) => {
      // Fetch all trades for this account today
      const todayTrades = await prisma.trade.findMany({
        where: {
          account_id: acc.id,
          time: { gte: startOfDay, lte: endOfDay }
        },
        select: { result_pnl: true }
      });
      
      const tradesToday = todayTrades.length;
      const pnlToday = todayTrades.reduce((sum, t) => sum + t.result_pnl, 0);
      
      // Calculate max loss limit based on percentage
      const dailyRiskLimit = acc.current_balance * (settings.risk_per_trade_pct / 100);
      const maxDailyLossAllowed = - (acc.current_balance * (settings.max_daily_loss_pct / 100));

      // Block if exceeded trade limit or max daily loss
      const isBlockedToday = tradesToday >= settings.max_trades_per_day || pnlToday <= maxDailyLossAllowed;

      return {
        ...acc,
        tradesToday,
        pnlToday,
        isBlockedToday,
        dailyRiskLimit,
        maxDailyLossAllowed
      };
    })
  );

  return accountStats;
}

// ── CRUD Accounts ──
export async function createAccount(data: { name: string; initial_balance: number }) {
  await prisma.account.create({
    data: {
      name: data.name,
      initial_balance: data.initial_balance,
      current_balance: data.initial_balance,
    }
  });
  revalidatePath("/settings");
  revalidatePath("/trades/new");
}

export async function updateAccount(id: number, data: { name: string; current_balance: number; is_active: boolean }) {
  await prisma.account.update({
    where: { id },
    data
  });
  revalidatePath("/settings");
  revalidatePath("/trades/new");
}

export async function deleteAccount(id: number) {
  // First, check if the account has trades.
  const tradeCount = await prisma.trade.count({ where: { account_id: id } });
  if (tradeCount > 0) {
    // If it has trades, mark as inactive instead of hard-deleting
    await prisma.account.update({
      where: { id },
      data: { is_active: false }
    });
  } else {
    await prisma.account.delete({ where: { id } });
  }
  revalidatePath("/settings");
  revalidatePath("/trades/new");
}

// ── Determine which account must be used next (Round Robin) ──
export async function getNextAccountToUse() {
  try {
    const stats = await getAccountsStatus();
    
    if (stats.length === 0) return { error: "No hay cuentas activas." };

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get the very last trade of the day to see which account was used
    const lastTrade = await prisma.trade.findFirst({
      where: { time: { gte: startOfDay } },
      orderBy: { time: 'desc' },
      select: { account_id: true }
    });

    let nextAccountId = null;

    if (!lastTrade) {
      // If no trades today, pick the first available
      const available = stats.find((a: any) => !a.isBlockedToday);
      if (!available) return { error: "Estás bloqueado: Has agotado los trades o superado la pérdida diaria (%) en todas las cuentas. Vuelve mañana." };
      nextAccountId = available.id;
    } else {
      // Round robin logic: Find the next account in the list after the last trade's account
      const lastAccIndex = stats.findIndex((a: any) => a.id === lastTrade.account_id);
      
      // Try checking subsequent accounts up to the current one
      for (let i = 1; i <= stats.length; i++) {
          const checkIndex = (lastAccIndex + i) % stats.length;
          if (!stats[checkIndex].isBlockedToday) {
              nextAccountId = stats[checkIndex].id;
              break;
          }
      }
      
      if (nextAccountId === null) {
          return { error: "Estás bloqueado: Has agotado los trades o superado la pérdida diaria (%) en todas las cuentas. Vuelve mañana." };
      }
    }

    const selectedAccount = stats.find((a: any) => a.id === nextAccountId);
    if (!selectedAccount) return { error: "No se ha podido encontrar la cuenta seleccionada." };

    return {
      account_id: selectedAccount.id,
      name: selectedAccount.name,
      maxRiskAmount: selectedAccount.dailyRiskLimit
    };
  } catch (err: any) {
    console.error("[ACCOUNTS ERROR]", err);
    return { error: "Error de base de datos o de configuración al recuperar la cuenta." };
  }
}

