export function convertMinutesToHourString(minutesInput: number) {
  const hours = Math.floor(minutesInput/60);
  const minutes = minutesInput % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}