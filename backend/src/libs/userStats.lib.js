// import { isCancel } from "axios";
// import { db } from "./db";

// export const updateUserStats = async (userId, submission) => {
//   //Normalizing today date(at midnight)
//   const today = new Date();
//   today.setUTCHours(0, 0, 0, 0);

//   const isAccepted = submission.status === "Accepted";

//   //Update daily user stats
//   const existingDaily = await db.dailyUserStats.upsert({
//     where: {
//       userId_date: { userId, date: today },
//     },
//     update: {
//       submissions: { increment: 1 },
//       accepted: isAccepted ? { increment: 1 } : undefined,
//       problemSolved: isAccepted ? { increment: 1 } : undefined,
//     },
//     create: {
//       userId,
//       date: today,
//       submissions: 1,
//       accepted: isAccepted ? 1 : 0,
//       problemSolved: isAccepted ? 1 : 0,
//     },
//   });

//   //📈 updating cumulative UserStats
//   const userStats = await db.userStats.upsert({
//     where: { userId },
//     update: {
//       totalSubmissions: { increment: 1 },
//       totalAccepted: isAccepted ? { increment: 1 } : undefined,
//       totalSolved: isAccepted ? { increment: 1 } : undefined,
//       /* successRate: isAccepted
//         ? undefined // recompute below
//         : undefined, */
//     },
//   });
// };
