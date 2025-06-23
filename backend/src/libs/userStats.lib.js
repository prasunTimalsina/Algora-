import { db } from "./db.js";
export const updateUserStats = async (userId, submission) => {
  ///need to fix only for testing
  // const today = overrideDate ?? new Date();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const isAccepted = submission.status === "Accepted";

  // Checking if the problem is already solved
  const alreadySolved = await db.problemSolved.findUnique({
    where: {
      userId_problemId: {
        userId,
        problemId: submission.problemId,
      },
    },
  });

  await db.$transaction(async (prisma) => {
    await prisma.dailyUserStats.upsert({
      where: { userId_date: { userId, date: today } },
      update: {
        submissions: { increment: 1 },
        accepted: isAccepted ? { increment: 1 } : undefined,
        problemsSolved:
          isAccepted && !alreadySolved ? { increment: 1 } : undefined,
      },
      create: {
        userId,
        date: today,
        submissions: 1,
        accepted: isAccepted ? 1 : 0,
        problemsSolved: isAccepted ? 1 : 0,
      },
    });

    const userStats = await prisma.userStats.upsert({
      where: { userId },
      update: {
        totalSubmissions: { increment: 1 },
        totalAccepted: isAccepted ? { increment: 1 } : undefined,
        totalSolved: isAccepted ? { increment: 1 } : undefined,
      },
      create: {
        userId,
        totalSubmissions: 1,
        totalAccepted: isAccepted ? 1 : 0,
        totalSolved: isAccepted ? 1 : 0,
        successRate: isAccepted ? 1.0 : 0.0,
      },
    });

    await prisma.userStats.update({
      where: { userId },
      data: {
        successRate:
          userStats.totalSubmissions > 0
            ? userStats.totalAccepted / userStats.totalSubmissions
            : 0,
      },
    });

    !alreadySolved && (await updateUserStreaks(prisma, userId, today));
  });
};

export const updateUserStreaks = async (prisma, userId, today) => {
  const userStats = await prisma.userStats.findUnique({ where: { userId } });

  if (!userStats) return;

  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);

  // Normalize lastStreakUpdate date for comparison
  const lastUpdate = userStats.lastStreakUpdate
    ? new Date(userStats.lastStreakUpdate)
    : null;

  if (lastUpdate) {
    lastUpdate.setUTCHours(0, 0, 0, 0);
  }

  console.log(lastUpdate && lastUpdate.getTime() === today.getTime());

  // If streak already updated today, do nothing
  if (lastUpdate && lastUpdate.getTime() === today.getTime()) {
    return;
  }

  const yesterdayStats = await prisma.dailyUserStats.findUnique({
    where: { userId_date: { userId, date: yesterday } },
  });

  const todayStats = await prisma.dailyUserStats.findUnique({
    where: { userId_date: { userId, date: today } },
  });

  const isActiveToday = todayStats?.problemsSolved > 0;

  const stats = await prisma.userStats.findUnique({ where: { userId } });

  await prisma.userStats.update({
    where: { userId },
    data: {
      currentStreak: isActiveToday
        ? yesterdayStats
          ? stats.currentStreak + 1
          : 1
        : 0,
      longestStreak:
        isActiveToday && stats.currentStreak + 1 > stats.longestStreak
          ? stats.currentStreak + 1
          : stats.longestStreak,
      lastStreakUpdate: today,
    },
  });
};
