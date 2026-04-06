"use server";

import { prisma } from "@/lib/prisma";

// ── Get Active Accounts with current daily usage ──
export async function getAccountsStatus() {
  const accounts = await prisma.account.findMany({
    where: { is_active: true }
  });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Count trades today for each account
  const accountStats = await Promise.all(
    accounts.map(async (acc) => {
      const tradesToday = await prisma.trade.count({
        where: {
          account_id: acc.id,
          time: { gte: startOfDay, lte: endOfDay }
        }
      });
      return {
        ...acc,
        tradesToday,
        isBlockedToday: tradesToday >= 2,
        dailyRiskLimit: acc.current_balance * 0.005 // 0.5% max risk
      };
    })
  );

  return accountStats;
}

// ── Determine which account must be used next (Round Robin) ──
export async function getNextAccountToUse() {
  const stats = await getAccountsStatus();
  
  if (stats.length === 0) throw new Error("No hay cuentas activas.");

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
    if (!available) throw new Error("Has agotado todas las balas en todas las cuentas hoy. Vete a dormir.");
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
        throw new Error("Has agotado tu límite de trades diarios en todas las cuentas. Cierra la pantalla.");
    }
  }

  const selectedAccount = stats.find((a: any) => a.id === nextAccountId);
  return {
    account_id: selectedAccount.id,
    name: selectedAccount.name,
    maxRiskAmount: selectedAccount.dailyRiskLimit
  };
}
