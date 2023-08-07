export default function isAfternoon() {
  const currentTimeStamp = Date.now();
  const currentDate = new Date(currentTimeStamp);

  const targetHours = 14; // 2 PM in 24-hour format
  const targetMinutes = 0; // 0 minutes

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  if (currentHours > targetHours) {
    return true;
  } else if (currentHours === targetHours && currentMinutes >= targetMinutes) {
    return true;
  } else {
    return false;
  }
}
