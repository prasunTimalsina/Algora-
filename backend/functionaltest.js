const sampleSubmissionTimes = [
  '["0.050 s"]',
  '["0.040 s"]',
  '["0.045 s"]',
  '["0.060 s"]',
  '["0.035 s"]',
];

// Simulate the current submission time
const currentAvgTime = 0.045; // in seconds

const parsedTimes = sampleSubmissionTimes.map((str) => {
  const times = JSON.parse(str); // ["0.050 s"]
  return times.map((t) => parseFloat(t.replace(" s", "")))[0]; // take first if only one
});

// Exclude current submission time
const filtered = parsedTimes.filter((time) => time !== currentAvgTime);

const calculatePercentile = (submissionTimes, yourTime) => {
  if (submissionTimes.length === 0) return 100;

  const slowerUsers = submissionTimes.filter((t) => t > yourTime).length;

  const percentile = (slowerUsers / submissionTimes.length) * 100;
  return parseFloat(percentile.toFixed(2));
};

console.log(calculatePercentile(filtered, currentAvgTime));
