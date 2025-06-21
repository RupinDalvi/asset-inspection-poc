export function calculateMagnitude({ x, y, z }) {
  return Math.sqrt(x*x + y*y + z*z);
}
export function classifyVibration(data) {
  if (!data.length) return 'Unknown';
  const mags = data.map(d => d.magnitude);
  const mean = mags.reduce((sum,m) => sum+m,0)/mags.length;
  const variance = mags.reduce((sum,m) => sum+Math.pow(m-mean,2),0)/mags.length;
  const stddev = Math.sqrt(variance);
  const peakThreshold = mean + 2;
  const peaks = mags.filter(m => m > peakThreshold).length;
  return (stddev < 1.5 && peaks < 5)
    ? 'Normal Vibration'
    : 'Abnormal Vibration Detected';
}

