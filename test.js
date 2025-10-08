export const updateUserStats = async (
  userId: string,
  submission: Submission
) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const isAccepted = submission.status === "Accepted";

  // ⏱ Update DailyUserStats
  const existingDaily = await db.dailyUserStats.upsert({
    where: {
      userId_date: { userId, date: today },
    },
    update: {
      submissions: { increment: 1 },
      accepted: isAccepted ? { increment: 1 } : undefined,
      problemsSolved: isAccepted ? { increment: 1 } : undefined,
    },
    create: {
      userId,
      date: today,
      submissions: 1,
      accepted: isAccepted ? 1 : 0,
      problemsSolved: isAccepted ? 1 : 0,
    },
  });

  // 📈 Update cumulative UserStats
  const userStats = await db.userStats.upsert({
    where: { userId },
    update: {
      totalSubmissions: { increment: 1 },
      totalAccepted: isAccepted ? { increment: 1 } : undefined,
      totalSolved: isAccepted ? { increment: 1 } : undefined,
      successRate: isAccepted
        ? undefined // recompute below
        : undefined,
      avgTimeMs: submission.time
        ? {
            set: await calculateNewAverage(
              userId,
              "avgTimeMs",
              parseFloat(submission.time)
            ),
          }
        : undefined,
      avgMemoryKb: submission.memory
        ? {
            set: await calculateNewAverage(
              userId,
              "avgMemoryKb",
              parseFloat(submission.memory)
            ),
          }
        : undefined,
    },
    create: {
      userId,
      totalSubmissions: 1,
      totalAccepted: isAccepted ? 1 : 0,
      totalSolved: isAccepted ? 1 : 0,
      successRate: isAccepted ? 1.0 : 0.0,
    },
  });

  // ♻️ Recalculate success rate
  const updated = await db.userStats.update({
    where: { userId },
    data: {
      successRate:
        userStats.totalSubmissions > 0
          ? userStats.totalAccepted / userStats.totalSubmissions
          : 0,
    },
  });

  // 🔁 Update streaks
  await updateUserStreaks(userId, today);
};

export const updateUserStreaks = async (userId: string, today: Date) => {
  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);

  const yesterdayStats = await db.dailyUserStats.findUnique({
    where: { userId_date: { userId, date: yesterday } },
  });

  const todayStats = await db.dailyUserStats.findUnique({
    where: { userId_date: { userId, date: today } },
  });

  const isActiveToday = todayStats?.problemsSolved > 0;

  const stats = await db.userStats.findUnique({ where: { userId } });

  await db.userStats.update({
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
    },
  });
};

const calculateNewAverage = async (
  userId: string,
  field: "avgTimeMs" | "avgMemoryKb",
  newValue: number
): Promise<number> => {
  const stats = await db.userStats.findUnique({ where: { userId } });
  const count = stats.totalAccepted || 1; // avoid divide-by-zero
  const oldAvg = stats[field] || 0;
  return (oldAvg * (count - 1) + newValue) / count;
};
